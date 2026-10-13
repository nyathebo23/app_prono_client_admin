import { Component, input, output, signal } from '@angular/core';
import { GoalScored } from '../../models/goal-scored';
import { GoalCancelConfirmDialog } from '../goal-cancel-confirm-dialog/goal-cancel-confirm-dialog';

@Component({
  imports: [GoalCancelConfirmDialog],
  selector: 'app-goal-scored-view-item',
  styleUrl: './goal-scored-view-item.scss',
  templateUrl: './goal-scored-view-item.html',
})
export class GoalScoredViewItem {
  readonly goal = input.required<GoalScored>();
  readonly homeTeamName = input.required<string>();
  readonly awayTeamName = input.required<string>();
  readonly matchFinished = input(false);
  readonly edit = output<GoalScored>();
  readonly cancelled = output<void>();

  protected readonly isCancelConfirmationOpen = signal(false);


  protected closeCancelConfirmation(): void {
    this.isCancelConfirmationOpen.set(false);
  }
}
