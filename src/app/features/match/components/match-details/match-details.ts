import { DatePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchStatus } from '../../enums/match-status';
import { MatchType } from '../../enums/match-type';
import { GoalScored } from '../../models/goal-scored';
import { MatchDetailsStore } from '../../stores/match-details-store';
import { getMatchStatusLabel } from '../../utils/match-status-label';
import { GoalScoredForm } from '../goal-scored-form/goal-scored-form';
import { GoalScoredViewItem } from '../goal-scored-view-item/goal-scored-view-item';
import { GoalScoredUpdateDialog } from '../goal-scored-update-dialog/goal-scored-update-dialog';
import { MatchStatusChangeConfirmDialog } from '../match-status-change-confirm-dialog/match-status-change-confirm-dialog';
import { PenaltyShootoutResultForm } from '../penalty-shootout-result-form/penalty-shootout-result-form';

@Component({
  selector: 'app-match-details',
  imports: [
    DatePipe,
    GoalScoredForm,
    GoalScoredViewItem,
    GoalScoredUpdateDialog,
    MatchStatusChangeConfirmDialog,
    PenaltyShootoutResultForm,
  ],
  styleUrl: './match-details.scss',
  templateUrl: './match-details.html',
})
export class MatchDetails {

  private readonly route = inject(ActivatedRoute);
  private readonly matchDetailsStore = inject(MatchDetailsStore);

  private readonly matchId = this.matchDetailsStore.matchId;
  private readonly matchDetails = this.matchDetailsStore.matchDetailsResource.value;
  
  private readonly matchStatusLabel = getMatchStatusLabel;
  private readonly MatchStatus = MatchStatus;
  private readonly selectedMatchStatus = signal<MatchStatus | null>(null);
  private readonly statusToConfirm = signal<MatchStatus | null>(null);
  private readonly isStatusConfirmationOpen = signal(false);

  private readonly matchStatusOptions = computed<MatchStatus[]>(() => {
    const currentMatch = this.matchDetails();
    if (currentMatch?.matchType === MatchType.KNOCKOUT) {
      return Object.values(MatchStatus);
    }

    return [
      MatchStatus.SCHEDULED,
      MatchStatus.FIRST_HALF,
      MatchStatus.HALF_TIME,
      MatchStatus.SECOND_HALF,
      MatchStatus.FINISHED,
      MatchStatus.CANCELLED,
      MatchStatus.POSTPONED,
    ];
  });

  private readonly goalToEdit = signal<GoalScored | null>(null);


  constructor() {
    effect(() => {
      const idFromRoute = this.route.snapshot.paramMap.get('id');
      if (idFromRoute) {
        this.matchDetailsStore.matchId.set(idFromRoute);
      }
    });
  }

  private selectMatchStatus(status: MatchStatus): void {
    const selectedStatus = this.matchStatusOptions().find((option) => option === status);
    if (selectedStatus) {
      this.selectedMatchStatus.set(selectedStatus);
    }
  }

  private requestStatusChange(): void {
    const currentMatch = this.matchDetails();
    const selected = this.selectedMatchStatus() ?? currentMatch?.status;

    if (currentMatch && selected && selected !== currentMatch.status) {
      this.statusToConfirm.set(selected);
      this.isStatusConfirmationOpen.set(true);
    }
  }

  private cancelStatusChange(): void {
    this.isStatusConfirmationOpen.set(false);
    this.statusToConfirm.set(null);
    this.selectedMatchStatus.set(null);
  }

  private openGoalUpdate(goal: GoalScored): void {
    this.goalToEdit.set(goal);
  }

  private closeGoalUpdate(): void {
    this.goalToEdit.set(null);
  }

  private scoreLabel(): string {
    const currentMatch = this.matchDetails();

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
