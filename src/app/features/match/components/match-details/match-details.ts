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
import { MatchEditDialog } from '../match-edit-dialog/match-edit-dialog';
import { MatchDetailsLiveService } from '../../services/match-details-live-service';
import { ResourceError } from '../../../../shared/components/resource-error/resource-error';

@Component({
  selector: 'app-match-details',
  imports: [
    DatePipe,
    GoalScoredForm,
    GoalScoredViewItem,
    GoalScoredUpdateDialog,
    MatchStatusChangeConfirmDialog,
    PenaltyShootoutResultForm,
    MatchEditDialog,
    ResourceError,
  ],
  styleUrl: './match-details.scss',
  templateUrl: './match-details.html',
})
export class MatchDetails {

  private readonly route = inject(ActivatedRoute);
  private readonly matchDetailsStore = inject(MatchDetailsStore);

  private readonly matchLiveDetailsService = inject(MatchDetailsLiveService);
  protected readonly matchId = this.matchDetailsStore.matchId;
  protected readonly matchDetails = this.matchDetailsStore.matchDetailsResource.value;
  protected readonly matchDetailsLoading = this.matchDetailsStore.matchDetailsResource.isLoading;
  protected readonly matchDetailsError = this.matchDetailsStore.matchDetailsResourceError;
  
  protected readonly matchStatusLabel = getMatchStatusLabel;
  protected readonly MatchStatus = MatchStatus;
  protected readonly selectedMatchStatus = signal<MatchStatus | null>(null);
  protected readonly statusToConfirm = signal<MatchStatus | null>(null);
  protected readonly isStatusConfirmationOpen = signal(false);

  protected readonly matchStatusOptions = computed<MatchStatus[]>(() => {
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

  protected readonly goalToEdit = signal<GoalScored | null>(null);
  protected readonly isMatchEditDialogOpen = signal(false);


  constructor() {
      const idFromRoute = this.route.snapshot.paramMap.get('id');
      if (idFromRoute) {
        this.matchDetailsStore.matchId.set(idFromRoute);
        this.matchLiveDetailsService.connect();
      }
  }

  protected selectMatchStatus(status: MatchStatus): void {
    const selectedStatus = this.matchStatusOptions().find((option) => option === status);
    if (selectedStatus) {
      this.selectedMatchStatus.set(selectedStatus);
    }
  }

  protected requestStatusChange(): void {
    const currentMatch = this.matchDetails();
    const selected = this.selectedMatchStatus() ?? currentMatch?.status;

    if (currentMatch && selected && selected !== currentMatch.status) {
      this.statusToConfirm.set(selected);
      this.isStatusConfirmationOpen.set(true);
    }
  }

  protected cancelStatusChange(): void {
    this.isStatusConfirmationOpen.set(false);
    this.statusToConfirm.set(null);
    this.selectedMatchStatus.set(null);
  }

  protected openGoalUpdate(goal: GoalScored): void {
    this.goalToEdit.set(goal);
  }

  protected closeGoalUpdate(): void {
    this.goalToEdit.set(null);
  }

  protected openMatchEditDialog(): void {
    this.isMatchEditDialogOpen.set(true);
  }

  protected closeMatchEditDialog(): void {
    this.isMatchEditDialogOpen.set(false);
  }

  protected reloadMatch(): void {
    this.matchDetailsStore.reload();
  }

  protected scoreLabel(): string {
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
