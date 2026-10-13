export interface GoalCanceledEvent {
	goalId: string;
	matchId: string;
	competitionId: string;
	scoreHome: number;
	scoreAway: number;
	occurredAt: string;
}
