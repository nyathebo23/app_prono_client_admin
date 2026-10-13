import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { SearchTeamQueryDto } from '../../../team/dtos/search-team-query-dto';
import { CompetitionExtended } from '../../models/competition-extended';
import { TeamQueryStore } from '../../../team/stores/team-query-store';
import { TeamInCompetitionService } from '../../services/team-in-competition-service';
import { createMutation } from '../../../../shared/mutation/create-mutation';
import { SingleCompetitionDetailsStore } from '../../stores/single-competition-details-store';

@Component({
  selector: 'app-competition-add-team-form',
  imports: [],
  templateUrl: './competition-add-team-form.html',
  styleUrl: './competition-add-team-form.scss',
  providers: [TeamQueryStore]
})
export class CompetitionAddTeamForm implements OnInit {


  private readonly teamInCompetitionService = inject(TeamInCompetitionService);
  private readonly competitionStore = inject(SingleCompetitionDetailsStore);
  private readonly teamQueryStore = inject(TeamQueryStore);


  protected readonly selectedTeamId = signal('');
  private readonly _enrollMutation = createMutation<string>();
  protected readonly enrollLoading = this._enrollMutation.loading;
  protected readonly enrollError = this._enrollMutation.error;

  protected readonly teamsResource = this.teamQueryStore.teamsResource;
  private readonly teamsResourceError = this.teamQueryStore.teamsResourceError;
  
  readonly competition = input.required<CompetitionExtended>();

  ngOnInit(): void {
    const competition = this.competition();
    this.teamQueryStore.query.set(      
      new SearchTeamQueryDto(
        competition.countryCode,
        competition.participantKind,
        competition.playerSex
      )
    );
  }

  readonly availableTeams = computed(() => {
    const registeredTeamIds = new Set(
      this.competition().teamsInCompetition.map((entry) => entry.team.id),
    );
    return this.teamsResource.value().filter((team) => !registeredTeamIds.has(team.id));
  });

  readonly isFull = computed(
    () => this.competition().teamsInCompetition.length >= this.competition().numberOfTeams,
  );

  onTeamChange(event: Event): void {
    this.selectedTeamId.set((event.target as HTMLSelectElement).value);
  }

  async enrollTeam(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const teamId = this.selectedTeamId();
    const competition = this.competition();
    if (!teamId || this.isFull() || this.enrollLoading()) return;


    const result = await this._enrollMutation.mutate(
      this.teamInCompetitionService.enrollTeamToCompetition({
        competitionId: competition.id,
        teamId
      })
    );
    if (result.success) {
      this.competitionStore.reload();
      this.selectedTeamId.set('');
    }

  }

}
