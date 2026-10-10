import { GoalCreateDto } from '../dtos/goal-create-dto';
import { GoalUpdateDto } from '../dtos/goal-update-dto';
import { GoalScored } from './goal-scored';

export type GoalScoredFormModel = {
  matchId: string;
  scorer: string;
  minute: number;
  isOwnGoal: boolean;
  isPenalty: boolean;
  teamHomeScored: boolean;
};

export const GoalScoredFormModel = {
  empty(matchId: string): GoalScoredFormModel {
    return {
      matchId,
      scorer: '',
      minute: 0,
      isOwnGoal: false,
      isPenalty: false,
      teamHomeScored: false
    };
  },

  fromGoal(goal: GoalScored): GoalScoredFormModel {
    return {
      matchId: goal.matchId,
      scorer: goal.scorer,
      minute: goal.minute,
      isOwnGoal: goal.isOwnGoal,
      isPenalty: goal.isPenalty,
      teamHomeScored: goal.teamHomeScored,
    };
  },
};

export function toGoalCreateDto(model: GoalScoredFormModel): GoalCreateDto {
  return {
    matchId: model.matchId,
    scorer: model.scorer.trim(),
    minute: model.minute,
    isOwnGoal: model.isOwnGoal,
    isPenalty: model.isPenalty,
    teamHomeScored: model.teamHomeScored,
  };
}

export function toGoalUpdateDto(model: GoalScoredFormModel): GoalUpdateDto {
  return {
    matchId: model.matchId,
    scorer: model.scorer.trim(),
    minute: model.minute,
    isOwnGoal: model.isOwnGoal,
    isPenalty: model.isPenalty,
    teamHomeScored: model.teamHomeScored,
  };
}
