export interface GoalUpdatedEvent {
	goalId: string;
	matchId: string;
	competitionId: string;
	scorer: string;
	minute: number;
	isOwnGoal: boolean;
	isPenalty: boolean;
	teamHomeScored: boolean;
	scoreHome: number;
	scoreAway: number;
	occurredAt: string;
}
