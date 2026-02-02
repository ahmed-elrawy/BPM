import { Routes } from '@angular/router';
import { SideNav } from '../../core/components/side-nav/side-nav';
import { MAIN_ROUTES } from '../../core/components/header/models/header';
import { APPLICATIONS_ROUTES } from './constants/applications';
import { Application } from './application';

export const ApplicationRoutes: Routes = [
  {
    path: '',
    component: Application , // Wrap routes in MainLayout
    children: [
      {
        path: '',
        redirectTo: APPLICATIONS_ROUTES.ASSIGNMENTS,
        pathMatch: 'full',
      },
      {
        path: APPLICATIONS_ROUTES.ASSIGNMENTS,
        loadComponent: () =>
          import('./components/assignments/assignments').then((m) => m.Assignments),
      },
      {
        path: APPLICATIONS_ROUTES.REQUESTS,
        loadComponent: () => import('./components/requests/requests').then((m) => m.Requests),
      },
    ],
  },
];
