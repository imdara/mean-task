import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private nameSource = new BehaviorSubject<any>(null);
  currentName = this.nameSource.asObservable();

  private tokenSource = new BehaviorSubject<any>(null);
  currentToken = this.tokenSource.asObservable();

  constructor(private http: HttpClient) {}

  login = (user: any) =>
    this.http.post('http://localhost:4000/api/auth/login', user);

  signup = (user: any) =>
    this.http.post('http://localhost:4000/api/auth/signup', user);

  setToken = (token: any) =>
    this.currentToken.subscribe(() => this.tokenSource.next(token));

  getNameFromToken = () =>
    this.http
      .get('http://localhost:4000/api/auth', {
        headers: { authorization: cookies.get('token') },
      })
      .subscribe((res: any) => this.nameSource.next(res.name));
}
