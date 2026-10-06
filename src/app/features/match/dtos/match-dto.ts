import { MatchStatus } from '../enums/match-status';
import { MatchType } from '../enums/match-type';
import { GoalScoredDto } from './goal-scored-dto';

export interface MatchDto {
        id: string;
        competitionId: string;
        teamHomeId: string;
        teamAwayId: string;
        competition: string;
        teamHome: string;
        teamAway: string;
        plannedStartDatetime: string;
        effectiveStartDatetime: string | null;
        isInProgress: boolean;
        status: MatchStatus;
        resultTeamHome: number;
        resultTeamAway: number;
        resultExtraTimeTeamHome: number | null;
        resultExtraTimeTeamAway: number | null;
        resultPenShootoutTeamHome: number | null;
        resultPenShootoutTeamAway: number | null;
        matchType: MatchType;
        goals: GoalScoredDto[];
}


