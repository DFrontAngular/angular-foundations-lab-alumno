import type { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routing-lab-shell'),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      { path: 'products', loadComponent: () => import('./product-list-page') },
      { path: 'products/:productId', loadComponent: () => import('./product-detail-page') },
      { path: '**', loadComponent: () => import('./local-not-found-page') },
    ],
  },
];

export default routes;
