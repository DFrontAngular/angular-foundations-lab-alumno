import type { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./lab-16-page'),
    children: [
      {
        path: 'products/:productId',
        loadComponent: () => import('./product-lookup-page'),
      },
    ],
  },
];

export default routes;
