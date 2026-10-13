import { Component, effect, inject, input, output, signal } from '@angular/core';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { TeamQueryStore } from '../../../team/stores/team-query-store';
import { TeamInCompetitionService } from '../../services/team-in-competition-service';
import { SingleCompetitionDetailsStore } from '../../stores/single-competition-details-store';

@Component({
  imports: [],
  selector: 'app-remove-team-confirm-dialog',
  styleUrl: './remove-team-confirm-dialog.scss',
  templateUrl: './remove-team-confirm-dialog.html',
  providers: [TeamQueryStore],
})
export class RemoveTeamConfirmDialog {
  private readonly teamInCompetitionService = inject(TeamInCompetitionService);
  private readonly competitionStore = inject(SingleCompetitionDetailsStore);
  private readonly teamQueryStore = inject(TeamQueryStore);

  readonly competitionId = input.required<string>();
  readonly teamId = input.required<string>();
  readonly teamName = input.required<string>();

  readonly onDialogClosed = output<void>();

  private readonly selectedTeamId = signal('');
  private readonly _removeMutation = createMutation<null>();
  protected readonly removeLoading = this._removeMutation.loading;
  protected readonly removeError = this._removeMutation.error;

  constructor() {
    effect(() => this.selectedTeamId.set(this.teamId()));
  }

  async confirmRemoval(): Promise<void> {
    const teamId = this.selectedTeamId();
    if (!teamId) return;

    const result = await this._removeMutation.mutate(
      this.teamInCompetitionService.removeTeamFromCompetition(this.competitionId(), teamId),
    );

    if (result.success) {
      this.competitionStore.reload();
      this.onDialogClosed.emit();
    }
  }

  closeDialog(): void {
    if (!this.removeLoading()) {
      this.onDialogClosed.emit();
    }
  }
}
