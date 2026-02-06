import { Routes } from '@angular/router';
import { MAIN_ROUTES } from './core/components/header/models/header';
import { MainLayout } from './core/components/main-layout/main-layout';
import { AuthGuard } from './core/guards/guard';
import { RouteDataHelper } from './core/utils/route-data';

export const routes: Routes = [
  //  {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [AuthGuard],
  //   data: RouteDataHelper.withRoles(['admin', 'super-admin'])
  // },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  //   data: RouteDataHelper.withRoles(['user'], '/task-dashboard')
  // },
  // {
  //   path: 'public',
  //   component: PublicComponent,
  //   data: RouteDataHelper.public()
  // }
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
        // canActivate: [AuthGuard],
        data: RouteDataHelper.public(),
        loadComponent: () => import('../app/features/applications/applications').then((m) => m.Applications),

      },
       {
        path: MAIN_ROUTES.APPLICTION,
        // canActivate: [AuthGuard],
         loadChildren: () =>
          import('../app/features/application/application.routes').then(
            (m) => m.ApplicationRoutes
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
