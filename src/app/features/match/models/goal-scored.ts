import { GoalScoredDto } from '../dtos/goal-scored-dto';
import { GoalScoredEvent } from '../live-events/goal-scored-event';

export class GoalScored {
  constructor(
    public id: string,
    public matchId: string,
    public scorer: string,
    public minute: number,
    public isOwnGoal: boolean,
    public isPenalty: boolean,
    public teamHomeScored: boolean,
    public isCanceled = false,
  ) {}

  static fromGoalScoredDto(dto: GoalScoredDto): GoalScored {
    return new GoalScored(
      dto.id,
      dto.matchId,
      dto.scorer,
      dto.minute,
      dto.isOwnGoal,
      dto.isPenalty,
      dto.teamHomeScored,
      dto.isCanceled ?? false,
    );
  }

  static fromGoalScoredEvent(event: GoalScoredEvent): GoalScored {
    return new GoalScored(
      event.goalId,
      event.matchId,
      event.scorer,
      event.minute,
      event.isOwnGoal,
      event.isPenalty,
      event.teamHomeScored,
      false
    );
  }
}