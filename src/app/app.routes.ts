import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./component/admin/admin.routes').then(m => m.adminRoutes),
  },
  {
    path: '',
    loadChildren: () => import('./component/present/present.routes').then(m => m.presentRoutes)
  }
];