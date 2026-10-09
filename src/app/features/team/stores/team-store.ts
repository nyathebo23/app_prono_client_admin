import { computed, inject, Service, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { createMutation } from '../../../shared/mutation/create-mutation';
import { SearchTeamQueryDto } from '../dtos/search-team-query-dto';
import { TeamCreateDto } from '../dtos/team-create-dto';
import { TeamDto } from '../dtos/team-dto';
import { TeamService } from '../services/team-service';
import { createApiErrorResponse } from '../../../shared/api/api-error-response';

@Service()
export class TeamStore {
  private readonly teamService = inject(TeamService);
  private readonly query = signal<SearchTeamQueryDto>(SearchTeamQueryDto.empty());

  private readonly _createMutation = createMutation<TeamDto>();
  private readonly _updateMutation = createMutation<TeamDto>();
  private readonly _deleteMutation = createMutation<void>();


  readonly createLoading = this._createMutation.loading;
  readonly updateLoading = this._updateMutation.loading

  readonly createError = this._createMutation.error;
  readonly updateError = this._updateMutation.error

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

  async createTeam(data: TeamCreateDto): Promise<boolean> {
    const result = await this._createMutation.mutate(this.teamService.createTeam(data));
    if (result.success) {
      this.reload();
    }
    return result.success;
  }

  async updateTeam(id: string, data: TeamCreateDto): Promise<boolean> {
    const result = await this._updateMutation.mutate(this.teamService.updateTeam(id, data));
    if (result.success) {
      this.reload();
    }
    return result.success;
  }

  async deleteTeam(id: string): Promise<boolean> {
    const result = await this._deleteMutation.mutate(this.teamService.deleteTeam(id));
    if (result.success) {
      this.reload();
    }
    return result.success;
  }
}
