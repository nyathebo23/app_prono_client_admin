import { GoalScoredDto } from '../dtos/goal-scored-dto';

export class GoalScored {
  constructor(
    public id: string,
    public matchId: string,
    public scorer: string,
    public minute: number,
    public isOwnGoal: boolean,
    public isPenalty: boolean,
    public teamHomeScored: boolean,
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
    );
  }
}