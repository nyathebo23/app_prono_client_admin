import { CompetitionIcon } from "../icons/competition-icon/competition-icon";
import { MatchIcon } from "../icons/match-icon/match-icon";
import { TeamIcon } from "../icons/team-icon/team-icon";

export const sideNavItems = [
  {
    title: 'Matchs',
    route: '/match',
    icon: MatchIcon,
  },    
  {
    title: 'Compétitions',
    route: '/competition',
    icon: CompetitionIcon,
  },
  {
    title: 'Equipes',
    route: '/team',
    icon: TeamIcon, 
  }
];