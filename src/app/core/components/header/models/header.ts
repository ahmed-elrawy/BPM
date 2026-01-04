import { MenuItem } from 'primeng/api';

export enum MAIN_ROUTES {
  APPLICTIONS = 'applications',
  TASK_DASHBOARD = 'task-dashboard',
  DASHBOARD = 'dashboard',
  SYSTEM_MANAGEMENT = 'system-management',
}

export const NAV_ITEMS: MenuItem[] = [
  { label: 'Task Dashboard', icon: 'pi pi-list', route: `/${MAIN_ROUTES.TASK_DASHBOARD}` },

  { label: 'Applications', icon: 'pi pi-home', route: `/${MAIN_ROUTES.APPLICTIONS}` },
  {
    label: 'Dashboard',
    icon: 'pi pi-chart-bar',
    route: `/${MAIN_ROUTES.DASHBOARD}`,
    items: [
      { label: 'New Product', icon: 'pi pi-plus', route: '/products/new' },
      { separator: true },
      { label: 'Settings', icon: 'pi pi-cog', route: '/settings' },
    ],
  },
  { label: 'System Managment', icon: 'pi pi-tags', route: `/${MAIN_ROUTES.SYSTEM_MANAGEMENT}` },
];
export const LANGUAGES: MenuItem[] = [
  { label: 'English', icon: 'pi pi-check' },
  { label: 'Español', icon: '' },
  { label: 'Français', icon: '' },
  { label: 'Deutsch', icon: '' },
];
export const NOTIFICATIONS = [
  { id: 1, icon: 'pi pi-inbox', title: 'New message received', time: '2 min ago' },
  { id: 2, icon: 'pi pi-check-circle', title: 'Task completed successfully', time: '1 hour ago' },
  {
    id: 3,
    icon: 'pi pi-exclamation-circle',
    title: 'System update available',
    time: '3 hours ago',
  },
];
export const APPS = [
  { id: 1, name: 'Mail', icon: 'pi pi-envelope' },
  { id: 2, name: 'Calendar', icon: 'pi pi-calendar' },
  { id: 3, name: 'Drive', icon: 'pi pi-cloud' },
  { id: 4, name: 'Analytics', icon: 'pi pi-chart-line' },
];
