import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchStatus } from '../../enums/match-status';
import { GoalScored } from '../../models/goal-scored';
import { Match } from '../../models/match';
import { MatchCommandStore } from '../../stores/match-command-store';
import { MatchDetailsStore } from '../../stores/match-details-store';
import { getMatchStatusLabel } from '../../utils/match-status-label';
import { GoalScoredForm } from '../goal-scored-form/goal-scored-form';
import { GoalScoredUpdateDialog } from '../goal-scored-update-dialog/goal-scored-update-dialog';

@Component({
  selector: 'app-match-details',
  imports: [DatePipe, GoalScoredForm, GoalScoredUpdateDialog],
  styleUrl: './match-details.scss',
  templateUrl: './match-details.html',
})
export class MatchDetails {

  private readonly route = inject(ActivatedRoute);
  private readonly matchCommandStore = inject(MatchCommandStore);
  private readonly matchDetailsStore = inject(MatchDetailsStore);

  protected readonly matchId = this.matchDetailsStore.matchId;
  protected readonly match = computed<Match | null>(() => this.matchDetailsStore.matchDetailsResource.value());
  protected readonly matchStatusLabel = getMatchStatusLabel;

  protected readonly matchStatusOptions: MatchStatus[] = Object.values(MatchStatus);

  protected readonly statusError = this.matchCommandStore.changeStatusError;
  protected readonly statusLoading = this.matchCommandStore.changeStatusLoading;
  protected readonly goalToEdit = signal<GoalScored | null>(null);


  constructor() {
    effect(() => {
      const idFromRoute = this.route.snapshot.paramMap.get('id');
      if (idFromRoute) {
        this.matchDetailsStore.matchId.set(idFromRoute);
        console.log(this.match());
      }
    });
  }

  protected async updateMatchStatus(status: string): Promise<void> {
    const id = this.matchId();
    const current = this.match();
    const selectedStatus = this.matchStatusOptions.find((option) => option === status);

    if (!id || !current || !selectedStatus) {
      return;
    }

    const success = await this.matchCommandStore.changeMatchStatus(id, selectedStatus);
    if (success) {
      this.refreshMatch();
    }
  }

  protected refreshMatch(): void {
    this.matchDetailsStore.matchDetailsResource.reload();
  }

  protected openGoalUpdate(goal: GoalScored): void {
    this.goalToEdit.set(goal);
  }

  protected closeGoalUpdate(): void {
    this.goalToEdit.set(null);
  }

  protected scoreLabel(): string {
    const currentMatch = this.match();

    if (!currentMatch) {
      return '–';
    }

    if (
      currentMatch.status === MatchStatus.SCHEDULED ||
      currentMatch.status === MatchStatus.CANCELLED ||
      currentMatch.status === MatchStatus.POSTPONED
    ) {
      return '–';
    }

    const score = `${currentMatch.resultTeamHome} - ${currentMatch.resultTeamAway}`;

    if (currentMatch.resultExtraTimeTeamHome != null && currentMatch.resultExtraTimeTeamAway != null) {
      return `${score} • AP ${currentMatch.resultExtraTimeTeamHome} - ${currentMatch.resultExtraTimeTeamAway}`;
    }

    if (currentMatch.resultPenShootoutTeamHome != null && currentMatch.resultPenShootoutTeamAway != null) {
      return `${score} • TAB ${currentMatch.resultPenShootoutTeamHome} - ${currentMatch.resultPenShootoutTeamAway}`;
    }

    return score;
  }
}
