import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import { Team } from '../../models/team';
import { TeamFormModel, toTeamCreateDto } from '../../models/team-form-model';
import { TeamStore } from '../../stores/team-store';
import { teamKinds } from '../../enums/team-kind';
import { playerSexes } from '../../../../shared/utils/enums/player-sex';
import { countries as countryOptions } from '../../../../shared/utils/countries';
import { minLength, shouldNotStartWithSpace } from '../../../../shared/utils/forms/validation-rules';

@Component({
  selector: 'app-team-update-dialog',
  imports: [FormRoot, FormField],
  styleUrl: './team-update-dialog.scss',
  templateUrl: './team-update-dialog.html',
})
export class TeamUpdateDialog {
  private readonly teamStore = inject(TeamStore);

  readonly teamData = input<Team | null>(null);
  readonly onDialogClosed = output<void>();
  readonly isLoading = this.teamStore.updateLoading;
  readonly error = this.teamStore.updateError;

  readonly teamKinds = teamKinds;
  readonly playerSexes = playerSexes;
  readonly countries = countryOptions;

  readonly teamModel = signal<TeamFormModel>(TeamFormModel.empty());

  constructor() {
    effect(() => {
      const team = this.teamData();
      if (team) {
        this.teamModel.set(TeamFormModel.fromTeam(team));
      }
    });
  }

  readonly teamForm = form(
    this.teamModel,
    (schemaPath) => {
      required(schemaPath.name, { message: 'Le nom de l\'équipe est requis' });
      minLength(schemaPath.name, 3);
      shouldNotStartWithSpace(schemaPath.name);
      required(schemaPath.countryCode, { message: 'Le pays est requis' });
      required(schemaPath.teamKind, { message: 'Le type d\'équipe est requis' });
      required(schemaPath.playerSex, { message: 'Le sexe des joueurs est requis' });
    },
    {
      submission: {
        action: async () => {
          const team = this.teamData();
          if (!team) {
            return;
          }

          const success = await this.teamStore.updateTeam(
            team.id,
            toTeamCreateDto(this.teamModel()),
          );
          if (success) {
            this.onDialogClosed.emit();
          }
        },
      },
    },
  );

  closeDialog(): void {
    this.onDialogClosed.emit();
  }
}

