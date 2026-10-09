import { TeamInCompetitionDto } from '../dtos/team-in-competition-dto';
import { Team } from '../../team/models/team';

export class TeamInCompetition {
  constructor(
    public id: string,
    public team: Team,
    public isActive: boolean,
  ) {}

  static fromTeamInCompetitionDto(dto: TeamInCompetitionDto): TeamInCompetition {
    return new TeamInCompetition(
      dto.id,
      Team.fromTeamDto(dto.team),
      dto.isActive,
    );
  }
}