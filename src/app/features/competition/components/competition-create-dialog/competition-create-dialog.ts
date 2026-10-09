import { Component, inject, output, signal } from '@angular/core';
import { CompetitionStore } from '../../stores/competition-store';
import { CompetitionFormModel } from '../../models/competition-form-model';
import { form, required, FormRoot, FormField, min, max } from '@angular/forms/signals';
import { futureDateConstraint, minLength, rangeDateValidity, shouldNotStartWithSpace, validateDatetime } from '../../../../shared/utils/forms/validation-rules';
import { competitionTypes } from '../../enums/competition-type';
import { competitionScopes } from '../../enums/competition-scope';
import { competitionPhases } from '../../enums/competition-phase';
import { teamKinds } from '../../../team/enums/team-kind';
import { playerSexes } from '../../../../shared/utils/enums/player-sex';
import { countries as countryOptions } from '../../../../shared/utils/countries';


@Component({
  imports: [FormRoot, FormField],
  selector: 'app-competition-create-dialog',
  styleUrl: './competition-create-dialog.scss',
  templateUrl: './competition-create-dialog.html',
})
export class CompetitionCreateDialog {
  private readonly competitionStore = inject(CompetitionStore);
  isLoading = this.competitionStore.createLoading;
  error = this.competitionStore.createError;

  onDialogClosed = output();
  competitionModel = signal<CompetitionFormModel>(CompetitionFormModel.empty());

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
            const result = this.competitionStore.createCompetition(this.competitionModel().toDto());
          }
        } 
    }
  )
}
