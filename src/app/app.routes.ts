import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'history',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
  },
  {
    path: 'scan',
    loadComponent: () => import('./scan/scan.page').then((m) => m.ScanPage),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: '*',
    loadComponent: () =>
      import('./error/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
