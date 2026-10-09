import { GoalCreateDto } from '../dtos/goal-create-dto';

export type GoalScoredFormModel = {
  matchId: string;
  scorer: string;
  minute: number;
  isOwnGoal: boolean;
  isPenalty: boolean;
  teamHomeScored: boolean;
  toDto: () => GoalCreateDto;
};

export const GoalScoredFormModel = {
  empty(matchId: string): GoalScoredFormModel {
    return {
      matchId,
      scorer: '',
      minute: 0,
      isOwnGoal: false,
      isPenalty: false,
      teamHomeScored: true,
      toDto: () => ({
        matchId : matchId ?? '',
        scorer: '',
        minute: 0,
        isOwnGoal: false,
        isPenalty: false,
        teamHomeScored: true,
      }),
    };
  },
};

export function toGoalCreateDto(model: GoalScoredFormModel): GoalCreateDto {
  return {
    matchId: model.matchId,
    scorer: model.scorer.trim(),
    minute: model.minute ?? 0,
    isOwnGoal: model.isOwnGoal,
    isPenalty: model.isPenalty,
    teamHomeScored: model.teamHomeScored,
  };
}
