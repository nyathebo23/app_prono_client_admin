import { toLocalInput, toUtcIso } from '../../../shared/utils/date-utils';
import { PlayerSex } from '../../../shared/utils/enums/player-sex';
import { TeamKind } from '../../team/enums/team-kind';
import { CompetitionCreateDto } from '../dtos/competitition-create-dto';
import { CompetitionPhase } from '../enums/competition-phase';
import { CompetitionScope } from '../enums/competition-scope';
import { CompetitionType } from '../enums/competition-type';
import { Competition } from './competition';

export type CompetitionFormModel = {
    name: string;
    startDatetime: string;
    endDatetime: string;
    numberOfTeams: number;
    countryCode: string;
    participantKind: TeamKind;
    scope: CompetitionScope;
    type: CompetitionType;
    phase: CompetitionPhase | '';
    playerSex: PlayerSex;
};

export const CompetitionFormModel = {
  empty(): CompetitionFormModel {
    return {
      name: '',
      startDatetime: '',
      endDatetime: '',
      numberOfTeams: 0,
      countryCode: '',
      participantKind: TeamKind.CLUB,
      scope: CompetitionScope.NATIONAL,
      type: CompetitionType.LEAGUE,
      phase: '',
      playerSex: PlayerSex.MALE
    };
  },

  fromCompetition(competition: Competition): CompetitionFormModel {
    return {
        name: competition.name,
        startDatetime:  toLocalInput(competition.startDatetime),
        endDatetime: toLocalInput(competition.endDatetime),
        numberOfTeams: competition.numberOfTeams,
        countryCode: competition.countryCode ?? '',
        participantKind: competition.participantKind,
        type: competition.type,
        phase: competition.phase ?? '',
        scope: competition.scope,
        playerSex: competition.playerSex,
    };
  },
};

export function toCompetitionCreateDto(model: CompetitionFormModel): CompetitionCreateDto {
  return {
    name: model.name.trim(),
    startDatetime: toUtcIso(model.startDatetime),
    endDatetime: toUtcIso(model.endDatetime),
    numberOfTeams: model.numberOfTeams,
    countryCode: model.countryCode !== '' ? model.countryCode : undefined,
    participantKind: model.participantKind,
    competitionType: model.type,
    phase: model.phase !== '' ? model.phase : undefined,
    scope: model.scope,
    playerSex: model.playerSex,
  };
}
