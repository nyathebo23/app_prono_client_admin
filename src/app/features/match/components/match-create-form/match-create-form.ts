import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatchCommandStore } from '../../stores/match-command-store';
import { MatchFormModel, toMatchCreateDto } from '../../models/match-form-model';
import { disabled, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { futureDateConstraint, validateDatetime } from '../../../../shared/utils/forms/validation-rules';
import { PlayerSex, playerSexes } from '../../../../shared/utils/enums/player-sex';

import { MatchType } from '../../enums/match-type';
import { Team } from '../../../team/models/team';
import { TeamInCompetition } from '../../../competition/models/team-in-competition';
import { SingleCompetitionDetailsStore } from '../../../competition/stores/single-competition-details-store';
import { CompetitionQueryStore } from '../../../competition/stores/competition-query-store';
import { CompetitionType } from '../../../competition/enums/competition-type';
import { CompetitionPhase } from '../../../competition/enums/competition-phase';
import { differentTeams } from '../../utils/form-validation-rules';

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

  counteffect = 0;
  isLoading = this.matchCommandStore.createLoading;
  error = this.matchCommandStore.createError;

  matchModel = signal<MatchFormModel>(MatchFormModel.empty());
  playerSexes = playerSexes;
  MatchType = MatchType;

  selectedSex = this.competitionQueryStore.competitionPlayerSex;
  competitions = this.competitionQueryStore.competitionsActiveOrUpcomingResource;
  competitionSelected = this.competitionDetailsStore.competitionResource;
  teams = computed(() => this.getTeams(this.competitionSelected.value()?.teamsInCompetition));

  shouldMatchBeRegular = computed(() => {
    const competition = this.competitionSelected.value();
    if (!competition) return false;
    return competition.type === CompetitionType.LEAGUE || competition.phase === CompetitionPhase.LEAGUE_PHASE;
  });

  matchForm = form(
    this.matchModel,
    (schemaPath) => {
      required(schemaPath.teamHomeId, { message: "Vous devez choisir l' équipe à domicile" }),
      required(schemaPath.teamAwayId, { message: "Vous devez choisir l' équipe extérieure" }),
      differentTeams(schemaPath.teamHomeId, schemaPath.teamAwayId),
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
      disabled(schemaPath.matchType, { 
        when: () => this.shouldMatchBeRegular(),
      });
    },
    {
      submission: {
        action: async () => {
          const result = await this.matchCommandStore.createMatch(toMatchCreateDto(this.matchModel()));
          if (result) {

          }
        },
      },
    },
  );

  constructor() {
    effect(() => {
      const id = this.matchForm.competitionId().value();
      if (this.competitionDetailsStore.selectedCompetitionId() === (id || null)) return;
      this.competitionDetailsStore.selectedCompetitionId.set(id || null);
      console.log("effect count ", ++this.counteffect);
      this.matchModel.update((current) => ({
        ...current,
        matchType:  this.shouldMatchBeRegular() ? MatchType.REGULAR : current.matchType,
        teamHomeId: '',
        teamAwayId: '',
      }));
      console.log("effect count 2", ++this.counteffect);
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

