import { Routes } from '@angular/router';
import { HomeLayout } from './shared/layout/home-layout/home-layout';
import { CompetitionManagement } from './features/competition/components/competition-management/competition-management';
import { CompetitionDetails } from './features/competition/components/competition-details/competition-details';
import { TeamManagement } from './features/team/components/team-management/team-management';
import { MatchCreateForm } from './features/match/components/match-create-form/match-create-form';

export const routes: Routes = [
    {
        path: '',
        component: HomeLayout,
        children: [
            {
                path: 'competition',
                component: CompetitionManagement
            },
            {
                path: 'competition/:id',
                component: CompetitionDetails
            },
            {
                path: 'team',
                component: TeamManagement
            },
            {
                path: 'match',
                component: MatchCreateForm
            }
        ]
    },

];