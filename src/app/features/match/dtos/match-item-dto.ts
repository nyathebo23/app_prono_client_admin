import { MatchDto } from './match-dto';

export type MatchItemDto = Omit<MatchDto, 'goals'>;