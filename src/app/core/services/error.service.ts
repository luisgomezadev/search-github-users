import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private _message$ = new BehaviorSubject<string | null>(null);
  readonly message$ = this._message$.asObservable();

  show(message: string) { this._message$.next(message); }
  clear() { this._message$.next(null); }
}
