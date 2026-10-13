import { Component, computed, effect, inject, signal } from '@angular/core';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { MatchService } from '../../services/match-service';
import { MatchFormModel, toMatchCreateDto } from '../../models/match-form-model';
import { MatchQueryStore } from '../../stores/match-query-store';
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
  private readonly matchService = inject(MatchService);
  private readonly competitionQueryStore = inject(CompetitionQueryStore);
  private readonly competitionDetailsStore = inject(SingleCompetitionDetailsStore);
  private readonly matchQueryStore = inject(MatchQueryStore);
  private readonly _createMutation = createMutation<string>();

  protected readonly isLoading = this._createMutation.loading;
  protected readonly error = this._createMutation.error;

  matchModel = signal<MatchFormModel>(MatchFormModel.empty());
  playerSexes = playerSexes;
  MatchType = MatchType;

  protected readonly selectedSex = signal<PlayerSex>(PlayerSex.MALE);
  protected readonly competitionsResource = this.competitionQueryStore.competitionsActiveOrUpcomingResource;
  protected readonly competitions = this.competitionsResource.value;
  protected readonly competitionsBySex = computed(() =>
    this.competitions().filter((competition) => competition.playerSex === this.selectedSex()),
  );
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
        when: () => this.competitionsResource.isLoading(),
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
          const result = await this._createMutation.mutate(
            this.matchService.createMatch(toMatchCreateDto(this.matchModel())),
          );
          if (result.success) {
            this.matchModel.set(MatchFormModel.empty());
            this.competitionDetailsStore.selectedCompetitionId.set(null);
            this.matchQueryStore.matchesCompetitionResource.reload();
            this.matchQueryStore.matchesLiveResource.reload();
          }
        },
      },
    },
  );

  constructor() {
    effect(() => {
      const id = this.matchForm.competitionId().value();
      if (this.competitionDetailsStore.selectedCompetitionId() === (id || null)) return;
      this.competitionDetailsStore.selectedCompetitionId.set(id);
      this.matchModel.update((current) => ({
        ...current,
        matchType:  this.shouldMatchBeRegular() ? MatchType.REGULAR : current.matchType,
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
    this.selectedSex.set(sex);
    this.competitionDetailsStore.selectedCompetitionId.set(null);
    this.matchModel.update((m) => ({ ...m, competitionId: '', teamHomeId: '', teamAwayId: '' }));
  }

}

