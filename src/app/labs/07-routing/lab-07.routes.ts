import type { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routing-lab-shell'),
    children: [
      // TODO: redirige la raíz a products y declara las rutas de listado y detalle.
      { path: '**', loadComponent: () => import('./local-not-found-page') },
    ],
  },
];

export default routes;
