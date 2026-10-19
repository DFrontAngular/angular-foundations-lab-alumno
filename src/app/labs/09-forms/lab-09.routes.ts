import type { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./forms-lab-shell'),
    children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./forms-overview-page') },
      {
        path: 'reactive',
        loadComponent: () => import('./reactive/reactive-product-form-page'),
      },
      {
        path: 'signals',
        loadComponent: () => import('./signals/signal-product-form-page'),
      },
    ],
  },
];

export default routes;
