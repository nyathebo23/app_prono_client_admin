import { MatchStatus } from '../enums/match-status';

export function getMatchStatusLabel(status: MatchStatus): string {
  switch (status) {
    case MatchStatus.SCHEDULED:
      return 'Programmé';
    case MatchStatus.FIRST_HALF:
      return '1ère mi-temps';
    case MatchStatus.HALF_TIME:
      return 'Mi-temps';
    case MatchStatus.SECOND_HALF:
      return '2e mi-temps';
    case MatchStatus.PRE_EXTRA_TIME_BREAK:
      return 'Pause prolongations';
    case MatchStatus.EXTRA_TIME_FIRST_HALF:
      return 'Prolongation 1re';
    case MatchStatus.EXTRA_TIME_BREAK:
      return 'Pause prolongations';
    case MatchStatus.EXTRA_TIME_SECOND_HALF:
      return 'Prolongation 2e';
    case MatchStatus.PRE_PENALTY_BREAK:
      return 'Avant tirs au but';
    case MatchStatus.PENALTY_SHOOTOUT:
      return 'Tirs au but';
    case MatchStatus.FINISHED:
      return 'Terminé';
    case MatchStatus.CANCELLED:
      return 'Annulé';
    case MatchStatus.POSTPONED:
      return 'Reporté';
    default:
      return 'Inconnu';
  }
}