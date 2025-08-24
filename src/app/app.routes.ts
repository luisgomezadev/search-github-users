import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ScoreGuard } from './core/guards/score.guard';

export const routes: Routes = [
  { path: '', component: SearchComponent, title: 'GitHub Usuarios' },
  {
    path: 'user/:login',
    component: UserProfileComponent,
    canActivate: [ScoreGuard],
    title: 'Perfil de Usuario'
  },
  { path: '**', redirectTo: '' }
];
