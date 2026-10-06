export interface GoalCreateDto {
    matchId: string;
    scorer: string;
    minute: number;
    isOwnGoal: boolean;
    isPenalty: boolean;
    teamHomeScored: boolean;
}