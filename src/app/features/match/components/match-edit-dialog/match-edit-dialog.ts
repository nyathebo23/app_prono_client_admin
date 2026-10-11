import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormField, FormRoot, disabled, form, required } from '@angular/forms/signals';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { validateDatetime } from '../../../../shared/utils/forms/validation-rules';
import { Match } from '../../models/match';
import { MatchFormModel, toMatchCreateDto, toMatchUpdateDto } from '../../models/match-form-model';
import { MatchType } from '../../enums/match-type';
import { MatchService } from '../../services/match-service';
import { SingleCompetitionDetailsStore } from '../../../competition/stores/single-competition-details-store';
import { Team } from '../../../team/models/team';
import { TeamInCompetition } from '../../../competition/models/team-in-competition';
import { differentTeams } from '../../utils/form-validation-rules';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-match-edit-dialog',
  styleUrl: './match-edit-dialog.scss',
  templateUrl: './match-edit-dialog.html',
})
export class MatchEditDialog {
  private readonly matchService = inject(MatchService);
  private readonly competitionDetailsStore = inject(SingleCompetitionDetailsStore);
  private readonly _updateMutation = createMutation<null>();

  readonly match = input.required<Match>();
  readonly onDialogClosed = output<void>();

  private readonly isLoading = this._updateMutation.loading;
  private readonly error = this._updateMutation.error;
  private readonly matchModel = signal<MatchFormModel>(MatchFormModel.empty());
  private readonly MatchType = MatchType;
  private readonly competition = this.competitionDetailsStore.competitionResource.value;
  private readonly teams = computed(() => this.getTeams(this.competition()?.teamsInCompetition));

  constructor() {
    effect(() => {
      const currentMatch = this.match();
      this.matchModel.set(MatchFormModel.fromMatch(currentMatch));
      this.competitionDetailsStore.selectedCompetitionId.set(currentMatch.competitionId);
    });
  }

  private readonly matchForm = form(
    this.matchModel,
    (schemaPath) => {
      required(schemaPath.teamHomeId, { message: "Vous devez choisir l'équipe à domicile" });
      required(schemaPath.teamAwayId, { message: "Vous devez choisir l'équipe extérieure" });
      differentTeams(schemaPath.teamHomeId, schemaPath.teamAwayId);
      required(schemaPath.plannedStartDatetime, { message: 'Vous devez renseigner la date et heure prévue' });
      validateDatetime(schemaPath.plannedStartDatetime);
      disabled(schemaPath.teamHomeId, { when: () => this.competitionDetailsStore.competitionResource.isLoading() });
      disabled(schemaPath.teamAwayId, { when: () => this.competitionDetailsStore.competitionResource.isLoading() });
    },
    {
      submission: {
        action: async () => {
          const currentMatch = this.match();
          const result = await this._updateMutation.mutate(
            this.matchService.updateMatch(currentMatch.id, toMatchUpdateDto(this.matchModel())),
          );
          if (result.success) {
            this.competitionDetailsStore.reload();
            this.onDialogClosed.emit();
          }
        },
      },
    },
  );

  private getTeams(teamsInCompetition: TeamInCompetition[] | undefined): Team[] {
    return teamsInCompetition?.map((entry) => entry.team) ?? [];
  }

  private closeDialog(): void {
    if (!this.isLoading()) {
      this.onDialogClosed.emit();
    }
  }
}
