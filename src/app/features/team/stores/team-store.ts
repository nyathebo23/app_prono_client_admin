import { computed, inject, Service, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchTeamQueryDto } from '../dtos/search-team-query-dto';
import { TeamService } from '../services/team-service';
import { createApiErrorResponse } from '../../../shared/api/api-error-response';

@Service()
export class TeamStore {
  private readonly teamService = inject(TeamService);
  private readonly query = signal<SearchTeamQueryDto>(SearchTeamQueryDto.empty());

  readonly teamsResource = rxResource({
    stream: () => this.teamService.searchTeams(this.query()),
    defaultValue: []
  });


  readonly teamsResourceError = computed(
    () => createApiErrorResponse(this.teamsResource.error())
  );


  searchTeams(query: SearchTeamQueryDto = SearchTeamQueryDto.empty()): void {
    this.query.set(query);
  }

  reload(): void {
    this.teamsResource.reload();
  }

}
