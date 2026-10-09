import { MatchCreateDto } from '../dtos/match-create-dto';
import { MatchType } from '../enums/match-type';

export type MatchFormModel = {
  teamHomeId: string;
  teamAwayId: string;
  competitionId: string;
  matchType: MatchType;
  plannedStartDatetime: string;
  toDto: () => MatchCreateDto;
};

export const MatchFormModel = {
  empty(): MatchFormModel {
    return {
      teamHomeId: '',
      teamAwayId: '',
      competitionId: '',
      matchType: MatchType.REGULAR,
      plannedStartDatetime: '',
      toDto: () => ({
        teamHomeId: '',
        teamAwayId: '',
        competitionId: '',
        matchType: MatchType.REGULAR,
        plannedStartDatetime: '',
      }),
    };
  },
};

export function toMatchCreateDto(model: MatchFormModel): MatchCreateDto {
  return {
    teamHomeId: model.teamHomeId,
    teamAwayId: model.teamAwayId,
    competitionId: model.competitionId,
    matchType: model.matchType,
    plannedStartDatetime: model.plannedStartDatetime,
  };
}
