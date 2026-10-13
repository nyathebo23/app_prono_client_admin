import { Component, effect, inject, output, signal } from '@angular/core';
import { CompetitionFormModel, toCompetitionCreateDto } from '../../models/competition-form-model';
import { form, required, FormRoot, FormField, min, max, disabled } from '@angular/forms/signals';
import {
  futureDateConstraint,
  minLength,
  rangeDateValidity,
  shouldNotStartWithSpace,
  validateDatetime,
} from '../../../../shared/utils/forms/validation-rules';
import { CompetitionType, competitionTypes } from '../../enums/competition-type';
import { CompetitionScope, competitionScopes } from '../../enums/competition-scope';
import { competitionPhases } from '../../enums/competition-phase';
import { TeamKind, teamKinds } from '../../../team/enums/team-kind';
import { playerSexes } from '../../../../shared/utils/enums/player-sex';
import { countries as countryOptions } from '../../../../shared/utils/countries';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { CompetitionService } from '../../services/competition-service';
import { CompetitionQueryStore } from '../../stores/competition-query-store';

@Component({
  selector: 'app-competition-form',
  imports: [FormRoot, FormField],
  templateUrl: './competition-form.html',
  styleUrl: './competition-form.scss',
})
export class CompetitionForm {


  private readonly competitionService = inject(CompetitionService);
  private readonly competitionQueryStore = inject(CompetitionQueryStore);
  private readonly _createMutation = createMutation<string>();
  protected readonly isLoading = this._createMutation.loading;
  protected readonly error = this._createMutation.error;


  onMoveToListTab = output<void>();

  private moveToListTab() {
    this.onMoveToListTab.emit();
  }

  competitionModel = signal<CompetitionFormModel>(CompetitionFormModel.empty());

  competitionTypes = competitionTypes;
  competitionScopes = competitionScopes;
  competitionPhases = competitionPhases;
  participantKinds = teamKinds;
  playerSexes = playerSexes;
  countries = countryOptions;


  constructor() {
    effect(() => {
        if (this.competitionForm.type().value() == CompetitionType.LEAGUE) {
          this.competitionModel.update((current) => ({
            ...current,
            phase: ''
          }));          
        }
      }
    );
    effect(() => {
        if (this.competitionForm.scope().value() == CompetitionScope.NATIONAL) {
          this.competitionModel.update((current) => ({
            ...current,
            participantKind: TeamKind.CLUB
          }));          
        }
      }
    );  
  }

  competitionForm = form(this.competitionModel,
    (schemaPath) => {
      required(schemaPath.name, { message: 'Le nom de la compétition est requis' });
      minLength(schemaPath.name, 5);
      shouldNotStartWithSpace(schemaPath.name);
      min(schemaPath.numberOfTeams, 2, { message: 'Une compétition doit avoir au minimum 2 équipes' });
      max(schemaPath.numberOfTeams, 100, { message: "Une compétition ne doit pas avoir plus de 100 équipes" });
      required(schemaPath.startDatetime, { message: 'La date et heure de début est requise' });
      required(schemaPath.endDatetime, { message: 'La date et heure de fin est requise' });
      validateDatetime(schemaPath.startDatetime);
      validateDatetime(schemaPath.endDatetime);
      futureDateConstraint(schemaPath.endDatetime);
      rangeDateValidity(schemaPath.startDatetime, schemaPath.endDatetime);

      disabled(schemaPath.phase, {
        when: () => this.competitionForm.type().value() === CompetitionType.LEAGUE
      });

      disabled(schemaPath.participantKind, {
        when: () => this.competitionForm.scope().value() == CompetitionScope.NATIONAL
      });

    },
    {
      submission: {
        action: async () => {
          const result = await this._createMutation.mutate(this.competitionService.createCompetition(
            toCompetitionCreateDto(this.competitionModel())
          ));
          if (result.success) {
              this.competitionQueryStore.reloadCompetitions();
              this.moveToListTab();
          }
        },
      },
    },
  );
}
