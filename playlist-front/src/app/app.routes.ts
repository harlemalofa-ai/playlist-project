import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/playlists/dashboard/dashboard';
import { Create } from './features/playlists/create/create';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'playlists',
    component: Dashboard,
  },
  {
    path: 'playlists/create',
    component: Create,
  },
];
