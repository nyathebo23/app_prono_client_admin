import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { createApiErrorResponse } from '../../../../shared/api/api-error-response';
import { MatchStatus } from '../../enums/match-status';
import { MatchSummarized } from '../../models/match-summarized';
import { MatchService } from '../../services/match-service';
import { MatchQueryStore } from '../../stores/match-query-store';
import { getMatchStatusLabel } from '../../utils/match-status-label';
import { MatchEditDialog } from '../match-edit-dialog/match-edit-dialog';

@Component({
  selector: 'app-match-view-item',
  imports: [DatePipe, RouterLink, MatchEditDialog],
  styleUrl: './match-view-item.scss',
  templateUrl: './match-view-item.html',
})
export class MatchViewItem {
  private readonly matchService = inject(MatchService);
  private readonly matchQueryStore = inject(MatchQueryStore);

  match = input.required<MatchSummarized>();
  protected readonly MatchStatus = MatchStatus;
  private readonly matchStatusLabel = getMatchStatusLabel;
  protected readonly selectedMatchId = signal<string | null>(null);
  private readonly editMatchResource = rxResource({
    params: () => this.selectedMatchId() ?? undefined,
    stream: ({ params }) => this.matchService.getMatchById(params),
    defaultValue: undefined,
  });
  private readonly editMatchError = computed(() =>
    createApiErrorResponse(this.editMatchResource.error()),
  );

  private openMatchEditDialog(): void {
    if (this.match().status === MatchStatus.SCHEDULED) {
      this.selectedMatchId.set(this.match().id);
    }
  }

  private closeMatchEditDialog(): void {
    this.selectedMatchId.set(null);
  }

  private matchStatusClasses(status: MatchStatus): string {
    switch (status) {
      case MatchStatus.FINISHED:
        return 'bg-emerald-100 text-emerald-700 ring-emerald-200';
      case MatchStatus.CANCELLED:
        return 'bg-rose-100 text-rose-700 ring-rose-200';
      case MatchStatus.POSTPONED:
        return 'bg-amber-100 text-amber-700 ring-amber-200';
      case MatchStatus.SCHEDULED:
        return 'bg-sky-100 text-sky-700 ring-sky-200';
      default:
        return 'bg-violet-100 text-violet-700 ring-violet-200';
    }
  }

  private scoreLabel(match: MatchSummarized): string {
    if (
      match.status === MatchStatus.SCHEDULED ||
      match.status === MatchStatus.CANCELLED ||
      match.status === MatchStatus.POSTPONED ||
      match.resultTeamHome == null ||
      match.resultTeamAway == null
    ) {
      return '–';
    }

    const parts = [`${match.resultTeamHome} - ${match.resultTeamAway}`];

    if (match.resultExtraTimeTeamHome != null && match.resultExtraTimeTeamAway != null) {
      parts.push(`AP ${match.resultExtraTimeTeamHome} - ${match.resultExtraTimeTeamAway}`);
    }

    if (match.resultPenShootoutTeamHome != null && match.resultPenShootoutTeamAway != null) {
      parts.push(`TAB ${match.resultPenShootoutTeamHome} - ${match.resultPenShootoutTeamAway}`);
    }

    return parts.join(' • ');
  }

  private shouldDisplayScore(match: MatchSummarized): boolean {
    const hasStarted =
      match.status !== MatchStatus.SCHEDULED &&
      match.status !== MatchStatus.CANCELLED &&
      match.status !== MatchStatus.POSTPONED;

    return hasStarted && match.resultTeamHome != null && match.resultTeamAway != null;
  }
}
