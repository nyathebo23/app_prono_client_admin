import { CompetitionExtendedDto } from '../dtos/competition-extended-dto';
import { PlayerSex } from '../../../shared/utils/enums/player-sex';
import { TeamKind } from '../../team/enums/team-kind';
import { CompetitionScope } from '../enums/competition-scope';
import { CompetitionPhase } from '../enums/competition-phase';
import { CompetitionType } from '../enums/competition-type';
import { TeamInCompetition } from './team-in-competition';

export class CompetitionExtended {
  constructor(
    public id: string,
    public name: string,
    public startDatetime: Date,
    public endDatetime: Date,
    public numberOfTeams: number,
    public countryCode: string | null,
    public participantKind: TeamKind,
    public type: CompetitionType,
    public phase: CompetitionPhase,
    public scope: CompetitionScope,
    public playerSex: PlayerSex,
    public teamsInCompetition: TeamInCompetition[],
  ) {}

  static fromCompetitionExtendedDto(dto: CompetitionExtendedDto): CompetitionExtended {
    return new CompetitionExtended(
      dto.id,
      dto.name,
      dto.startDatetime,
      dto.endDatetime,
      dto.numberOfTeams,
      dto.countryCode,
      dto.participantKind,
      dto.type,
      dto.phase,
      dto.scope,
      dto.playerSex,
      dto.teamsInCompetition.map((team) => TeamInCompetition.fromTeamInCompetitionDto(team)),
    );
  }
}
