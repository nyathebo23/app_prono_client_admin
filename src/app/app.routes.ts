import { Routes } from '@angular/router';
import { HomeLayout } from './shared/layout/home-layout/home-layout';
import { CompetitionManagement } from './features/competition/components/competition-management/competition-management';
import { CompetitionDetails } from './features/competition/components/competition-details/competition-details';
import { TeamManagement } from './features/team/components/team-management/team-management';
import { MatchList } from './features/match/components/match-list/match-list';
import { MatchLiveList } from './features/match/components/match-live-list/match-live-list';
import { MatchCreateForm } from './features/match/components/match-create-form/match-create-form';
import { MatchInCompetitionList } from './features/match/components/match-in-competition-list/match-in-competition-list';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
    children: [
      {
        path: 'competition',
        component: CompetitionManagement,
      },
      {
        path: 'competition/:id',
        component: CompetitionDetails,
      },
      {
        path: 'team',
        component: TeamManagement,
        canActivate: [authGuard],
      },
      {
        path: 'match',
        component: MatchList,
        children: [
          {
            path: '',
            redirectTo: 'competition',
            pathMatch: 'full',
          },
          {
            path: 'competition',
            component: MatchInCompetitionList,
          },
          {
            path: 'live',
            component: MatchLiveList,
          },
          {
            path: 'create',
            component: MatchCreateForm,
            canActivate: [authGuard],
          },
          {
            path: ':id',
            loadComponent: () => import('./features/match/components/match-details/match-details').then((m) => m.MatchDetails),
          },
        ],
      },
    ],
  },
];