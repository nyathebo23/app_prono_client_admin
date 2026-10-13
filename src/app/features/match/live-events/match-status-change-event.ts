import { MatchStatus } from '../enums/match-status';

export interface MatchStatusChangedEvent {
	matchId: string;
	competitionId: string;
	status: MatchStatus;
	isInProgress: boolean;
	occurredAt: string;
}
