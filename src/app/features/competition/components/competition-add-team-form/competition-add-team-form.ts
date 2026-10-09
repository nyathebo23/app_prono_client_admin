import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { SearchTeamQueryDto } from '../../../team/dtos/search-team-query-dto';
import { CompetitionExtended } from '../../models/competition-extended';
import { TeamInCompetitionStore } from '../../stores/team-in-competition-store';
import { TeamQueryStore } from '../../../team/stores/team-query-store';

@Component({
  selector: 'app-competition-add-team-form',
  imports: [],
  templateUrl: './competition-add-team-form.html',
  styleUrl: './competition-add-team-form.scss',
  providers: [TeamQueryStore]
})
export class CompetitionAddTeamForm implements OnInit {

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
  readonly competition = input.required<CompetitionExtended>();

  private readonly teamInCompetitionStore = inject(TeamInCompetitionStore);
  private readonly teamQueryStore = inject(TeamQueryStore);


  private readonly selectedTeamId = signal('');
  private readonly enrollLoading = this.teamInCompetitionStore.enrollLoading;
  private readonly enrollError = this.teamInCompetitionStore.enrollError;

  private readonly teamsResource = this.teamQueryStore.teamsResource;
  private readonly teamsResourceError = this.teamQueryStore.teamsResourceError;
  

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

    const success = await this.teamInCompetitionStore.enrollTeam({
      teamId,
      competitionId: competition.id,
    });

    if (success) {
      this.selectedTeamId.set('');
    }
  }

}
