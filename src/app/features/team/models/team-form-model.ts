import { PlayerSex } from '../../../shared/utils/enums/player-sex';
import { TeamCreateDto } from '../dtos/team-create-dto';
import { TeamKind } from '../enums/team-kind';
import { Team } from './team';

export type TeamFormModel = {
  name: string;
  teamKind: TeamKind | '';
  countryCode: string;
  playerSex: PlayerSex;
  toDto: () => TeamCreateDto;
};

export const TeamFormModel = {
  empty(): TeamFormModel {
    return {
      name: '',
      teamKind: '',
      countryCode: '',
      playerSex: PlayerSex.MALE,
      toDto: () => ({
        name: '',
        kind: TeamKind.NATIONAL,
        countryCode: '',
        playerSex: PlayerSex.MALE,
      }),
    };
  },

  fromTeam(team: Team): TeamFormModel {
    return {
      name: team.name,
      teamKind: team.kind,
      countryCode: team.countryCode,
      playerSex: team.playerSex,
      toDto: () => ({
        name: team.name,
        kind: team.kind,
        countryCode: team.countryCode,
        playerSex: team.playerSex,
      }),
    };
  },
};

export function toTeamCreateDto(model: TeamFormModel): TeamCreateDto {
  return {
    name: model.name.trim(),
    kind: model.teamKind as TeamKind ?? TeamKind.NATIONAL,
    countryCode: model.countryCode ?? null,
    playerSex: model.playerSex ?? PlayerSex.MALE,
  };
}

