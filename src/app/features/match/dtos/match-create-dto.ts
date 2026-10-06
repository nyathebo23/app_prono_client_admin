import { MatchType } from "../enums/match-type";

export interface MatchCreateDto {
    teamHomeId: string;
    teamAwayId: string;
    competitionId: string;
    matchType: MatchType;
    plannedStartDatetime: Date;
}

