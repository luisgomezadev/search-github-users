import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { User, UserDetails } from '../interfaces/user.interface';
import { Response, SearchResult } from '../interfaces/response.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private http = inject(HttpClient);

  searchUsers(query: string): Observable<SearchResult> {
    return this.http
      .get<Response>(
        `${environment.apiUrl}/search/users?q=${encodeURIComponent(query)}`
      )
      .pipe(
        map((res) => this.limitItems(res)),
        switchMap((res) => {
          const userDetails$ = res.items.map((u) => this.getUser(u.login));
          return forkJoin(userDetails$).pipe(
            map((details: UserDetails[]) => ({
              response: res,
              labels: details.map((d) => d.login),
              followers: details.map((d) => d.followers ?? 0),
            }))
          );
        })
      );
  }

  getUser(login: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(
      `${environment.apiUrl}/users/${encodeURIComponent(login)}`
    );
  }

  getUserScore(login: string): Observable<number> {
    return this.searchUsers(login).pipe(
      map(
        (res) =>
          res.response.items.find(
            (u) => u.login.toLowerCase() === login.toLowerCase()
          )?.score ?? 0
      )
    );
  }

  private limitItems(res: Response, max: number = 10): Response {
    return {
      ...res,
      items: (res.items ?? []).slice(0, max),
    };
  }
}
