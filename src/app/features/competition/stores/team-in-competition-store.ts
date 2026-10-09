import { inject, Service } from '@angular/core';
import { createMutation } from '../../../shared/mutation/create-mutation';
import { CompetitionAddTeamDto } from '../dtos/competition-add-team-dto';
import { TeamInCompetitionService } from '../services/team-in-competition-service';
import { SingleCompetitionDetailsStore } from './single-competition-details-store';


@Service()
export class TeamInCompetitionStore {
  private readonly teamInCompetitionService = inject(TeamInCompetitionService);
  private readonly competitionStore = inject(SingleCompetitionDetailsStore);

  private readonly competitionResource = this.competitionStore.competitionResource;

  private readonly _enrollMutation = createMutation<string>();
  private readonly _removeMutation = createMutation<null>();
  private readonly _deleteMutation = createMutation<null>();

  readonly enrollLoading = this._enrollMutation.loading;
  readonly enrollError = this._enrollMutation.error;

  readonly removeLoading = this._removeMutation.loading;
  readonly removeError = this._removeMutation.error;

  readonly deleteLoading = this._deleteMutation.loading;
  readonly deleteError = this._deleteMutation.error;  

  async enrollTeam(data: CompetitionAddTeamDto): Promise<boolean> {
    const result = await this._enrollMutation.mutate(this.teamInCompetitionService.enrollTeamToCompetition(data));
    if (result.success) {
      this.competitionResource.reload();
    }
    return result.success;
  }

  async removeTeam(competitionId: string, teamId: string): Promise<boolean> {
    const result = await this._removeMutation.mutate(this.teamInCompetitionService.removeTeamFromCompetition(competitionId, teamId));
    if (result.success) {
      this.competitionResource.reload();
    }
    return result.success;
  }

  async deleteTeam(competitionId: string, teamId: string): Promise<boolean> {
    const result = await this._deleteMutation.mutate(this.teamInCompetitionService.deleteTeamFromCompetition(competitionId, teamId));
    if (result.success) {
      this.competitionResource.reload();
    }
    return result.success;
  }
}
