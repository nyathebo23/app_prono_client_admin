import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatchCommandStore } from '../../stores/match-command-store';
import { MatchFormModel } from '../../models/match-form-model';
import { disabled, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { futureDateConstraint, validateDatetime } from '../../../../shared/utils/forms/validation-rules';
import { PlayerSex, playerSexes } from '../../../../shared/utils/enums/player-sex';

import { MatchType } from '../../enums/match-type';
import { Team } from '../../../team/models/team';
import { TeamInCompetition } from '../../../competition/models/team-in-competition';
import { SingleCompetitionDetailsStore } from '../../../competition/stores/single-competition-details-store';
import { CompetitionQueryStore } from '../../../competition/stores/competition-query-store';

@Component({
  selector: 'app-match-create-form',
  imports: [FormRoot, FormField],
  templateUrl: './match-create-form.html',
  styleUrls: ['./match-create-form.scss'],
})
export class MatchCreateForm {
  private readonly matchCommandStore = inject(MatchCommandStore);
  private readonly competitionQueryStore = inject(CompetitionQueryStore);
  private readonly competitionDetailsStore = inject(SingleCompetitionDetailsStore);

  isLoading = this.matchCommandStore.createLoading;
  error = this.matchCommandStore.createError;

  matchModel = signal<MatchFormModel>(MatchFormModel.empty());
  playerSexes = playerSexes;
  MatchType = MatchType;

  selectedSex = this.competitionQueryStore.competitionPlayerSex;
  competitions = this.competitionQueryStore.competitionsActiveOrUpcomingResource;
  competitionSelected = this.competitionDetailsStore.competitionResource;
  teams = computed(() => this.getTeams(this.competitionSelected.value()?.teamsInCompetition));


  matchForm = form(
    this.matchModel,
    (schemaPath) => {
      required(schemaPath.teamHomeId, { message: "Vous devez choisir l' équipe à domicile" }),
      required(schemaPath.teamAwayId, { message: "Vous devez choisir l' équipe extérieure" }),
      required(schemaPath.plannedStartDatetime, { message: "Vous devez renseigner la date et heure prévue" }),
      validateDatetime(schemaPath.plannedStartDatetime),
      futureDateConstraint(schemaPath.plannedStartDatetime),
      required(schemaPath.competitionId, { message: "Vous devez choisir une compétition" }),

      disabled(schemaPath.competitionId, {
        when: () => this.competitions.isLoading(),
      });
      disabled(schemaPath.teamHomeId, { 
        when: () => !this.matchModel().competitionId || this.competitionSelected.isLoading(), 
      });
      disabled(schemaPath.teamAwayId, { 
        when: () => !this.matchModel().competitionId || this.competitionSelected.isLoading(),
      });
    },
    {
      submission: {
        action: async () => {
          
          
        },
      },
    },
  );

  constructor() {
    effect(() => {
      const id = this.matchForm.competitionId().value();
      if (this.competitionDetailsStore.selectedCompetitionId() === (id || null)) return;
      this.competitionDetailsStore.selectedCompetitionId.set(id || null);
      this.matchModel.update((current) => ({
        ...current,
        teamHomeId: '',
        teamAwayId: '',
      }));
    });
  }

  getTeams(teamsInCompetition: TeamInCompetition[] | undefined): Team[] {
    if (!teamsInCompetition) return [];
    return teamsInCompetition.map((teamInCompetition) => teamInCompetition.team);
  }

  onSexChange(sex: PlayerSex): void {
    this.competitionQueryStore.competitionPlayerSex.set(sex);
    this.competitionDetailsStore.selectedCompetitionId.set(null);
    this.matchModel.update((m) => ({ ...m, competitionId: '', teamHomeId: '', teamAwayId: '' }));
  }


}

