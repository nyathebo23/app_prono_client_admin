import { Component, inject, input, output } from '@angular/core';
import { MatchDetailsStore } from '../../stores/match-details-store';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { GoalScoredService } from '../../services/goal-scored-service';

@Component({
  imports: [],
  selector: 'app-goal-cancel-confirm-dialog',
  styleUrl: './goal-cancel-confirm-dialog.scss',
  templateUrl: './goal-cancel-confirm-dialog.html',
})
export class GoalCancelConfirmDialog {

  private readonly goalScoredService = inject(GoalScoredService);
  private readonly matchStore = inject(MatchDetailsStore);

  readonly goalId = input.required<string>();
  readonly scorer = input.required<string>();
  readonly matchId = input.required<string>();
  readonly dismissed = output<void>();

  private readonly _cancelMutation = createMutation<null>();
  protected readonly loading = this._cancelMutation.loading;
  protected readonly error = this._cancelMutation.error;

  protected async confirmCancellation(): Promise<void> {
    const result = await this._cancelMutation.mutate(
      this.goalScoredService.cancelGoal(this.goalId(), this.matchId())
    );
    if (result.success) {
      this.matchStore.reload();
      this.dismissed.emit();
    }
  }
}
