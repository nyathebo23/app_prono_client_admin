import { Component, inject, signal } from '@angular/core';
import { TeamStore } from '../../stores/team-store';
import { form, required, FormRoot, FormField } from '@angular/forms/signals';
import { TeamFormModel, toTeamCreateDto } from '../../models/team-form-model';
import { playerSexes } from '../../../../shared/utils/enums/player-sex';
import { countries as countryOptions } from '../../../../shared/utils/countries';
import { teamKinds } from '../../enums/team-kind';
import { minLength, shouldNotStartWithSpace } from '../../../../shared/utils/forms/validation-rules';
import { TeamService } from '../../services/team-service';
import { createMutation } from '../../../../shared/mutation/create-mutation';


@Component({
  selector: 'app-team-form',
  imports: [FormRoot, FormField],
  templateUrl: './team-form.html',
  styleUrls: ['./team-form.scss']
})
export class TeamForm  {
 
  private readonly teamStore = inject(TeamStore);
  private readonly teamService = inject(TeamService);
  private readonly _createMutation = createMutation<string>();
  isLoading = this._createMutation.loading;
  error = this._createMutation.error;

  teamModel = signal(TeamFormModel.empty());

  playerSexes = playerSexes;
  teamKinds = teamKinds;
  countries = countryOptions;

  teamForm = form(
    this.teamModel,
    (schemaPath) => {
      required(schemaPath.name, { message: 'Le nom de l\' équipe est requis' });
      minLength(schemaPath.name, 3),
      shouldNotStartWithSpace(schemaPath.name),
      required(schemaPath.countryCode, { message: 'Le pays est requis' }), 
      required(schemaPath.playerSex, { message: 'Vous devez choisir le sexe des joueurs' }),
      required(schemaPath.teamKind, { message: 'Le type d\' équipe est requis' })     
    },
    {
      submission: {
        action: async () => {
          const result = await this._createMutation.mutate(this.teamService.createTeam(toTeamCreateDto(this.teamModel())));
          if (result.success) {
            this.teamStore.reload()
          }
        },
      },
    },
  )
}
