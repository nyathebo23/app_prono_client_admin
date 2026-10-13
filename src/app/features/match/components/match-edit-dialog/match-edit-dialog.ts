import { Component, computed, effect, inject, input, output, signal, untracked } from '@angular/core';
import { FormField, FormRoot, disabled, form, required } from '@angular/forms/signals';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { futureDateConstraint, validateDatetime } from '../../../../shared/utils/forms/validation-rules';
import { Match } from '../../models/match';
import { MatchFormModel, toMatchUpdateDto } from '../../models/match-form-model';
import { MatchType } from '../../enums/match-type';
import { MatchService } from '../../services/match-service';
import { MatchDetailsStore } from '../../stores/match-details-store';
import { SingleCompetitionDetailsStore } from '../../../competition/stores/single-competition-details-store';
import { Team } from '../../../team/models/team';
import { TeamInCompetition } from '../../../competition/models/team-in-competition';
import { differentTeams } from '../../utils/form-validation-rules';
import { CompetitionQueryStore } from '../../../competition/stores/competition-query-store';
import { CompetitionType } from '../../../competition/enums/competition-type';
import { CompetitionPhase } from '../../../competition/enums/competition-phase';
import { PlayerSex, playerSexes } from '../../../../shared/utils/enums/player-sex';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-match-edit-dialog',
  styleUrl: './match-edit-dialog.scss',
  templateUrl: './match-edit-dialog.html',
})
export class MatchEditDialog {
  private readonly matchService = inject(MatchService);
  private readonly matchDetailsStore = inject(MatchDetailsStore);
  private readonly competitionQueryStore = inject(CompetitionQueryStore);
  private readonly competitionDetailsStore = inject(SingleCompetitionDetailsStore);
  private readonly _updateMutation = createMutation<null>();

  readonly match = input.required<Match>();
  readonly onDialogClosed = output<void>();

  protected readonly isLoading = this._updateMutation.loading;
  protected readonly error = this._updateMutation.error;
  protected readonly matchModel = signal<MatchFormModel>(MatchFormModel.empty());
  protected readonly MatchType = MatchType;

  protected readonly selectedSex = signal<PlayerSex | null>(null);
  protected readonly competitionsResource = this.competitionQueryStore.competitionsActiveOrUpcomingResource;
  protected readonly competitionsBySex = computed(() => 
    this.competitionsResource.value().filter((competition) => competition.playerSex === this.selectedSex())
  );
  protected readonly competitionSelected = this.competitionDetailsStore.competitionResource;
  protected readonly teams = computed(() => this.getTeams(this.competitionSelected.value()?.teamsInCompetition));

  playerSexes = playerSexes;
  
  shouldMatchBeRegular = computed(() => {
    const competition = this.competitionSelected.value();
    if (!competition) return false;
    return competition.type === CompetitionType.LEAGUE || competition.phase === CompetitionPhase.LEAGUE_PHASE;
  });

  constructor() {
    effect(() => {
      const competitionId = this.competitionDetailsStore.selectedCompetitionId();
      const competition = this.competitionSelected.value();
      if (!competitionId || this.competitionSelected.isLoading() || competition?.id !== competitionId) return;
      this.selectedSex.set(competition.playerSex);
    });

    effect(() => {
      const currentMatch = this.match();
      this.matchModel.set(MatchFormModel.fromMatch(currentMatch));
      this.selectedSex.set(null);
    });

    effect(() => {
      const currentMatch =  untracked(() => this.match());
      const id = this.matchForm.competitionId().value();
      if (this.competitionDetailsStore.selectedCompetitionId() === (id || null)) return;
      this.competitionDetailsStore.selectedCompetitionId.set(id);
      if (id === currentMatch.competitionId) {
        this.matchModel.set(MatchFormModel.fromMatch(currentMatch));
      }
      else {
        this.matchModel.update((current) => ({
          ...current,
          matchType:  this.shouldMatchBeRegular() ? MatchType.REGULAR : current.matchType,
          teamHomeId: '',
          teamAwayId: '',
        }));
      }
    });
  }

  protected readonly matchForm = form(
    this.matchModel,
    (schemaPath) => {
      required(schemaPath.teamHomeId, { message: "Vous devez choisir l'équipe à domicile" });
      required(schemaPath.teamAwayId, { message: "Vous devez choisir l'équipe extérieure" });
      differentTeams(schemaPath.teamHomeId, schemaPath.teamAwayId);
      required(schemaPath.plannedStartDatetime, { message: 'Vous devez renseigner la date et heure prévue' });
      validateDatetime(schemaPath.plannedStartDatetime);
      futureDateConstraint(schemaPath.plannedStartDatetime),
      required(schemaPath.competitionId, { message: "Vous devez choisir une compétition" }),      
      disabled(schemaPath.competitionId, {
        when: () => this.selectedSex() === null || this.competitionsResource.isLoading(),
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
          const currentMatch = this.match();
          const result = await this._updateMutation.mutate(
            this.matchService.updateMatch(currentMatch.id, toMatchUpdateDto(this.matchModel())),
          );
          if (result.success) {
            this.matchDetailsStore.reload();
            this.onDialogClosed.emit();
          }
        },
      },
    },
  );

  private getTeams(teamsInCompetition: TeamInCompetition[] | undefined): Team[] {
    return teamsInCompetition?.map((entry) => entry.team) ?? [];
  }

  onSexChange(sex: PlayerSex): void {
    this.selectedSex.set(sex);
    this.competitionDetailsStore.selectedCompetitionId.set(null);
    this.matchModel.update((m) => ({ ...m, competitionId: '', teamHomeId: '', teamAwayId: '' }));
  }

  protected closeDialog(): void {
    if (!this.isLoading()) {
      this.onDialogClosed.emit();
    }
  }
}
