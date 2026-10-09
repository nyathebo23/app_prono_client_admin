import { computed, inject, Service, signal } from '@angular/core';
import { SearchTeamQueryDto } from '../dtos/search-team-query-dto';
import { rxResource } from '@angular/core/rxjs-interop';
import { TeamService } from '../services/team-service';
import { createApiErrorResponse } from '../../../shared/api/api-error-response';

@Service({autoProvided: false})
export class TeamQueryStore {

    private readonly teamService = inject(TeamService);
    query = signal<SearchTeamQueryDto>(SearchTeamQueryDto.empty());

    readonly teamsResource = rxResource({
        stream: () => this.teamService.searchTeams(this.query()),
        defaultValue: []
    });


    readonly teamsResourceError = computed(
        () => createApiErrorResponse(this.teamsResource.error())
    );

}
