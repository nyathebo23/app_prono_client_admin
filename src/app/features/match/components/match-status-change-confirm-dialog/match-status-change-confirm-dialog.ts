import { Component, inject, input, output } from '@angular/core';
import { MatchStatus } from '../../enums/match-status';
import { getMatchStatusLabel } from '../../utils/match-status-label';
import { MatchService } from '../../services/match-service';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { MatchDetailsStore } from '../../stores/match-details-store';

@Component({
  imports: [],
  selector: 'app-match-status-change-confirm-dialog',
  styleUrl: './match-status-change-confirm-dialog.scss',
  templateUrl: './match-status-change-confirm-dialog.html',
})
export class MatchStatusChangeConfirmDialog {

  private readonly matchService = inject(MatchService);
  private readonly matchStore = inject(MatchDetailsStore);
  private readonly _statusChangeMutation = createMutation<null>();

  readonly matchId = input.required<string>();
  readonly currentStatus = input.required<MatchStatus>();
  readonly requestedStatus = input.required<MatchStatus>();

  readonly cancelled = output<void>();

  private readonly statusLabel = getMatchStatusLabel;
  private readonly loading = this._statusChangeMutation.loading;
  private readonly error = this._statusChangeMutation.error;

  private async confirmStatusChange(): Promise<void> {
    const result = await this._statusChangeMutation.mutate(
      this.matchService.changeMatchStatus(
        this.matchId(),
        this.requestedStatus(),
      )
    );
    if (result.success) {
      this.matchStore.reload();
    }
  }
}
