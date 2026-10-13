import { MatchStatus } from '../enums/match-status';

export interface GoalScoredEvent {
	goalId: string;
	matchId: string;
	competitionId: string;
	scorer: string;
	minute: number;
	isOwnGoal: boolean;
	isPenalty: boolean;
	teamHomeScored: boolean;
	matchStatus: MatchStatus;
	scoreHome: number;
	scoreAway: number;
	occurredAt: string;
}
