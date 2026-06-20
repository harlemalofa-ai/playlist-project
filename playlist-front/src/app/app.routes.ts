import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/playlists/dashboard/dashboard';
import { Create } from './features/playlists/create/create';
import { Edit } from './features/playlists/edit/edit';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'playlists',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'playlists/create',
    component: Create,
    canActivate: [authGuard],
  },
  {
    path: 'playlists/edit/:id',
    component: Edit,
    canActivate: [authGuard],
  },
];
