import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserDetails } from '../interfaces/user.interface';
import { Response } from '../interfaces/response.interface';


@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly base = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  searchUsers(q: string): Observable<Response> {
    return this.http.get<Response>(`${this.base}/search/users?q=${encodeURIComponent(q)}`)
      .pipe(
        map(res => ({
          ...res,
          items: res.items.slice(0, 10)
        }))
      );
  }

  getUser(login: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.base}/users/${encodeURIComponent(login)}`);
  }

  getUserScore(login: string): Observable<number> {
    return this.searchUsers(login).pipe(
      map(res => res.items?.find(u => u.login.toLowerCase() === login.toLowerCase())?.score ?? 0)
    );
  }
}
