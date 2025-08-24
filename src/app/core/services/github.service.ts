import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserDetails } from '../interfaces/user.interface';
import { Response } from '../interfaces/response.interface';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class GithubService {

  private http = inject(HttpClient);

  searchUsers(q: string): Observable<Response> {
    return this.http.get<Response>(`${environment.apiUrl}/search/users?q=${encodeURIComponent(q)}`)
      .pipe(
        map(res => ({
          ...res,
          items: res.items.slice(0, 10)
        }))
      );
  }

  getUser(login: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${environment.apiUrl}/users/${encodeURIComponent(login)}`);
  }

  getUserScore(login: string): Observable<number> {
    return this.searchUsers(login).pipe(
      map(res => res.items?.find(u => u.login.toLowerCase() === login.toLowerCase())?.score ?? 0)
    );
  }
}
