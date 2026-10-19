import type { Routes } from '@angular/router';

import { ProductsStore } from './labs/13-feature-state/products.store';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home-page'),
    title: 'Angular Foundations Lab',
  },
  {
    path: 'diagnostic',
    loadComponent: () => import('./pages/diagnostic/diagnostic-page'),
    title: 'Diagnóstico · Angular Foundations Lab',
  },
  {
    path: 'labs/01-bindings',
    loadComponent: () => import('./labs/01-bindings/lab-01-page'),
    title: '01 · Componentes y bindings',
  },
  {
    path: 'labs/02-signals-computed',
    loadComponent: () => import('./labs/02-signals-computed/lab-02-page'),
    title: '02 · Signals y computed',
  },
  {
    path: 'labs/03-control-flow',
    loadComponent: () => import('./labs/03-control-flow/lab-03-page'),
    title: '03 · Control flow',
  },
  {
    path: 'labs/04-inputs-outputs',
    loadComponent: () => import('./labs/04-inputs-outputs/lab-04-page'),
    title: '04 · Inputs y outputs',
  },
  {
    path: 'labs/05-dependency-injection',
    loadComponent: () => import('./labs/05-dependency-injection/lab-05-page'),
    title: '05 · Dependency Injection',
  },
  {
    path: 'labs/06-pipes-directives',
    loadComponent: () => import('./labs/06-pipes-directives/lab-06-page'),
    title: '06 · Pipes y directivas',
  },
  {
    path: 'labs/07-routing',
    loadChildren: () => import('./labs/07-routing/lab-07.routes'),
    title: '07 · Router',
  },
  {
    path: 'labs/08-query-params',
    loadComponent: () => import('./labs/08-query-params/lab-08-page'),
    title: '08 · Query params',
  },
  {
    path: 'labs/09-forms',
    loadChildren: () => import('./labs/09-forms/lab-09.routes'),
    title: '09 · Reactive Forms y Signal Forms',
  },
  {
    path: 'labs/10-http-resource',
    loadComponent: () => import('./labs/10-http-resource/lab-10-page'),
    title: '10 · httpResource',
  },
  {
    path: 'labs/11-http-mutations',
    loadComponent: () => import('./labs/11-http-mutations/lab-11-page'),
    title: '11 · Mutaciones HTTP',
  },
  {
    path: 'labs/12-rxjs-signals',
    loadComponent: () => import('./labs/12-rxjs-signals/lab-12-page'),
    title: '12 · RxJS y signals',
  },
  {
    path: 'labs/13-feature-state',
    providers: [ProductsStore],
    loadComponent: () => import('./labs/13-feature-state/lab-13-page'),
    title: '13 · Estado de feature',
  },
  {
    path: 'labs/14-architecture',
    loadComponent: () => import('./labs/14-architecture/lab-14-page'),
    title: '14 · Arquitectura',
  },
  {
    path: 'labs/15-component-testing',
    loadComponent: () => import('./labs/15-component-testing/lab-15-page'),
    title: '15 · Testing de componentes',
  },
  {
    path: 'labs/16-routing-http-testing',
    loadChildren: () => import('./labs/16-routing-http-testing/lab-16.routes'),
    title: '16 · Testing de Router y HTTP',
  },
  {
    path: 'capstone',
    loadComponent: () => import('./capstone/capstone-page'),
    title: 'Capstone · Product Workspace',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found-page'),
    title: 'Página no encontrada',
  },
];
