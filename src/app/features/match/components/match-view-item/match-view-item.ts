import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatchStatus } from '../../enums/match-status';
import { MatchSummarized } from '../../models/match-summarized';
import { getMatchStatusLabel } from '../../utils/match-status-label';

@Component({
  selector: 'app-match-view-item',
  imports: [DatePipe, RouterLink],
  styleUrl: './match-view-item.scss',
  templateUrl: './match-view-item.html',
})
export class MatchViewItem {

  match = input.required<MatchSummarized>();
  protected readonly MatchStatus = MatchStatus;
  protected readonly matchStatusLabel = getMatchStatusLabel;

  protected matchStatusClasses(status: MatchStatus): string {
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

  protected scoreLabel(match: MatchSummarized): string {
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

  protected shouldDisplayScore(match: MatchSummarized): boolean {
    const hasStarted =
      match.status !== MatchStatus.SCHEDULED &&
      match.status !== MatchStatus.CANCELLED &&
      match.status !== MatchStatus.POSTPONED;

    return hasStarted && match.resultTeamHome != null && match.resultTeamAway != null;
  }
}
