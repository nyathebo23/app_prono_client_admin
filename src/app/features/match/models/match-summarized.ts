import { MatchItemDto } from '../dtos/match-item-dto';
import { MatchStatus } from '../enums/match-status';
import { MatchType } from '../enums/match-type';

export class MatchSummarized {
  constructor(
    public id: string,
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
  ) {}

  static fromMatchDto(dto: MatchItemDto): MatchSummarized {
    return new MatchSummarized(
      dto.id,
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
    );
  }
}