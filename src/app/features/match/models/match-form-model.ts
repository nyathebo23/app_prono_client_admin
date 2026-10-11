import { toUtcIso } from '../../../shared/utils/date-utils';
import { MatchCreateDto } from '../dtos/match-create-dto';
import { MatchType } from '../enums/match-type';
import { Match } from './match';
import { toLocalInput } from '../../../shared/utils/date-utils';
import { MatchUpdateDto } from '../dtos/match-update-dto';

export type MatchFormModel = {
  teamHomeId: string;
  teamAwayId: string;
  competitionId: string;
  matchType: MatchType;
  plannedStartDatetime: string;
};

export const MatchFormModel = {
  empty(): MatchFormModel {
    return {
      teamHomeId: '',
      teamAwayId: '',
      competitionId: '',
      matchType: MatchType.REGULAR,
      plannedStartDatetime: ''
    };
  },

  fromMatch(match: Match): MatchFormModel {
    return {
      teamHomeId: match.teamHomeId,
      teamAwayId: match.teamAwayId,
      competitionId: match.competitionId,
      matchType: match.matchType,
      plannedStartDatetime: toLocalInput(new Date(match.plannedStartDatetime)),
    };
  },
};

export function toMatchCreateDto(model: MatchFormModel): MatchCreateDto {
  return {
    teamHomeId: model.teamHomeId,
    teamAwayId: model.teamAwayId,
    competitionId: model.competitionId,
    matchType: model.matchType,
    startDatetime: toUtcIso(model.plannedStartDatetime),
  };
}

export function toMatchUpdateDto(model: MatchFormModel): MatchUpdateDto {
  return {
    teamHomeId: model.teamHomeId,
    teamAwayId: model.teamAwayId,
    competitionId: model.competitionId,
    matchType: model.matchType,
    startDatetime: toUtcIso(model.plannedStartDatetime),
  };
}
