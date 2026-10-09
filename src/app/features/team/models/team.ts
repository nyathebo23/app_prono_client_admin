import { TeamDto } from '../dtos/team-dto';
import { PlayerSex } from '../../../shared/utils/enums/player-sex';
import { TeamKind } from '../enums/team-kind';

export class Team {
  constructor(
    public id: string,
    public name: string,
    public kind: TeamKind,
    public countryCode: string,
    public playerSex: PlayerSex,
  ) {}

  static fromTeamDto(dto: TeamDto): Team {
    return new Team(
      dto.id,
      dto.name,
      dto.kind,
      dto.countryCode,
      dto.playerSex,
    );
  }
}