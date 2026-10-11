import { Component, effect, inject, input, output, signal } from '@angular/core';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { TeamQueryStore } from '../../../team/stores/team-query-store';
import { TeamInCompetitionService } from '../../services/team-in-competition-service';
import { SingleCompetitionDetailsStore } from '../../stores/single-competition-details-store';

@Component({
  imports: [],
  selector: 'app-delete-team-confirm-dialog',
  styleUrl: './delete-team-confirm-dialog.scss',
  templateUrl: './delete-team-confirm-dialog.html',
  providers: [TeamQueryStore],
})
export class DeleteTeamConfirmDialog {
  private readonly teamInCompetitionService = inject(TeamInCompetitionService);
  private readonly competitionStore = inject(SingleCompetitionDetailsStore);
  private readonly teamQueryStore = inject(TeamQueryStore);

  readonly competitionId = input.required<string>();
  readonly teamId = input.required<string>();
  readonly teamName = input.required<string>();

  readonly onDialogClosed = output<void>();

  private readonly selectedTeamId = signal('');
  private readonly _deleteMutation = createMutation<null>();
  private readonly deleteLoading = this._deleteMutation.loading;
  private readonly deleteError = this._deleteMutation.error;

  constructor() {
    effect(() => this.selectedTeamId.set(this.teamId()));
  }

  async confirmDeletion(): Promise<void> {
    const teamId = this.selectedTeamId();
    if (!teamId) return;

    const result = await this._deleteMutation.mutate(
      this.teamInCompetitionService.deleteTeamFromCompetition(this.competitionId(), teamId),
    );

    if (result.success) {
      this.competitionStore.reload();
      this.onDialogClosed.emit();
    }
  }

  closeDialog(): void {
    if (!this.deleteLoading()) {
      this.onDialogClosed.emit();
    }
  }
}
