import { Component, inject, signal, input, output, effect  } from '@angular/core';
import { CompetitionFormModel, toCompetitionCreateDto } from '../../models/competition-form-model';
import { form, required, FormRoot, FormField, min, max } from '@angular/forms/signals';
import { futureDateConstraint, minLength, rangeDateValidity, shouldNotStartWithSpace, validateDatetime } from '../../../../shared/utils/forms/validation-rules';
import { competitionTypes } from '../../enums/competition-type';
import { competitionScopes } from '../../enums/competition-scope';
import { competitionPhases } from '../../enums/competition-phase';
import { teamKinds } from '../../../team/enums/team-kind';
import { playerSexes } from '../../../../shared/utils/enums/player-sex';
import { countries as countryOptions } from '../../../../shared/utils/countries';
import { Competition } from '../../models/competition';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { CompetitionQueryStore } from '../../stores/competition-query-store';
import { CompetitionService } from '../../services/competition-service';


@Component({
  imports: [FormRoot, FormField],
  selector: 'app-competition-update-dialog',
  styleUrl: './competition-update-dialog.scss',
  templateUrl: './competition-update-dialog.html',
})
export class CompetitionUpdateDialog {

  private readonly competitionService = inject(CompetitionService);
  private readonly competitionQueryStore = inject(CompetitionQueryStore);
  private readonly _updateMutation = createMutation<null>();
  isLoading = this._updateMutation.loading;
  error = this._updateMutation.error;

  competitionData = input.required<Competition>();

  onDialogClosed = output();

  closeDialog() {
    this.onDialogClosed.emit();
  }

  competitionModel = signal<CompetitionFormModel>(CompetitionFormModel.empty());

  constructor() {
    effect(() => {
        this.competitionModel.set(CompetitionFormModel.fromCompetition(this.competitionData()));
    });
  }

  competitionTypes = competitionTypes;
  competitionScopes = competitionScopes;
  competitionPhases = competitionPhases;
  participantKinds = teamKinds;
  playerSexes = playerSexes;
  countries = countryOptions;

  competitionForm = form(this.competitionModel, 
    (schemaPath) => {
      required(schemaPath.name, { message: "Le nom de la competition est requis" }),
      minLength(schemaPath.name, 5),
      shouldNotStartWithSpace(schemaPath.name),
      min(schemaPath.numberOfTeams, 2, { message: "Une compétition doit avoir au minimum 2 équipes" }),
      max(schemaPath.numberOfTeams, 100, { message: "Une compétition ne doit pas avoir plus de 100 équipes" }),
      required(schemaPath.startDatetime, { message: "La date et heure de début est requise" } ),
      required(schemaPath.endDatetime, { message: "La date et heure de fin est requise" } ),
      validateDatetime(schemaPath.startDatetime),
      validateDatetime(schemaPath.endDatetime)
      futureDateConstraint(schemaPath.endDatetime),
      rangeDateValidity(schemaPath.startDatetime, schemaPath.endDatetime)
    },
    {
        submission: {
          action: async () => {
            const result = await this._updateMutation.mutate(
              this.competitionService.updateCompetition(this.competitionData()!.id, toCompetitionCreateDto(this.competitionModel()))
            );
            if (result.success) {
              this.competitionQueryStore.reloadCompetitions();
            }
          }
        } 
    }
  )
}
