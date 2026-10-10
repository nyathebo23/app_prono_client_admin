import { MatchDto } from '../dtos/match-dto';
import { MatchStatus } from '../enums/match-status';
import { MatchType } from '../enums/match-type';
import { GoalScored } from './goal-scored';

export class Match {
  constructor(
    public id: string,
    public competitionId: string,
    public teamHomeId: string,
    public teamAwayId: string,
    public competition: string,
    public teamHome: string,
    public teamAway: string,
    public plannedStartDatetime: string,
    public effectiveStartDatetime: string | null,
    public isInProgress: boolean,
    public status: MatchStatus,
    public resultTeamHome: number,
    public resultTeamAway: number,
    public resultExtraTimeTeamHome: number | null,
    public resultExtraTimeTeamAway: number | null,
    public resultPenShootoutTeamHome: number | null,
    public resultPenShootoutTeamAway: number | null,
    public matchType: MatchType,
    public goals: GoalScored[],
  ) {}

  static fromMatchDto(dto: MatchDto): Match {
    const goals = dto.goals.map((goalDto) => GoalScored.fromGoalScoredDto(goalDto))
    .map((goal) => {
      goal.matchId = dto.id; 
      return goal; 
    });
    
    return new Match(
      dto.id,
      dto.competitionId,
      dto.teamHomeId,
      dto.teamAwayId,
      dto.competition,
      dto.teamHome,
      dto.teamAway,
      dto.plannedStartDatetime,
      dto.effectiveStartDatetime,
      dto.isInProgress,
      dto.status,
      dto.resultTeamHome,
      dto.resultTeamAway,
      dto.resultExtraTimeTeamHome,
      dto.resultExtraTimeTeamAway,
      dto.resultPenShootoutTeamHome,
      dto.resultPenShootoutTeamAway,
      dto.matchType,
      goals,
    );
  }
}