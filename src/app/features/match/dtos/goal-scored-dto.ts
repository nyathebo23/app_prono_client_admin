
export interface GoalScoredDto {
    id: string;
    matchId: string;
    scorer: string;
    minute: number;
    isOwnGoal: boolean;
    isPenalty: boolean;
    teamHomeScored: boolean;
}