import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { GithubService } from '../services/github.service';
import { ErrorService } from '../services/error.service';

export const ScoreGuard: CanActivateFn = (route) => {

  const githubService = inject(GithubService);
  const router = inject(Router);
  const errorService = inject(ErrorService);

  const login = route.paramMap.get('login') || '';

  return githubService.getUserScore(login).pipe(
    map(score => {
      if (score >= 30) return true;
      errorService.show(`Acceso denegado: el score de ${login} es menor de 30.`);
      router.navigateByUrl('/');
      return false;
    })
  );
};
