import { CompetitionDto } from '../dtos/competition-dto';
import { PlayerSex } from '../../../shared/utils/enums/player-sex';
import { TeamKind } from '../../team/enums/team-kind';
import { CompetitionScope } from '../enums/competition-scope';
import { CompetitionType } from '../enums/competition-type';
import { CompetitionPhase } from '../enums/competition-phase';

export class Competition {
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
  ) {}

  static fromCompetitionDto(dto: CompetitionDto): Competition {
    return new Competition(
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
    );
  }
}