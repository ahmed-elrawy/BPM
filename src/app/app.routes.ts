import { Routes } from '@angular/router';
import { MAIN_ROUTES } from './core/components/header/models/header';
import { MainLayout } from './core/components/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout, // Wrap routes in MainLayout
    children: [
      {
        path: '',
        redirectTo: MAIN_ROUTES.APPLICTIONS,
        pathMatch: 'full',
      },
      {
        path: MAIN_ROUTES.APPLICTIONS,
        loadChildren: () =>
          import('../app/features/applications/applications.routes').then(
            (m) => m.ApplicationsRoutes
          ),
      },
      {
        path: MAIN_ROUTES.DASHBOARD,
        loadComponent: () => import('../app/features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: MAIN_ROUTES.SYSTEM_MANAGEMENT,
        loadComponent: () =>
          import('../app/features/system-management/system-management').then(
            (m) => m.SystemManagement
          ),
      },
      {
        path: MAIN_ROUTES.TASK_DASHBOARD,
        loadComponent: () =>
          import('../app/features/task-dashboard/task-dashboard').then((m) => m.TaskDashboard),
      },
    ],
  },
];
