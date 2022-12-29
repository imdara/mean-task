import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import Cookies from 'universal-cookie';
import { Router } from '@angular/router';

const cookies = new Cookies();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private nameSource = new BehaviorSubject<any>(null);
  currentName = this.nameSource.asObservable();

  private idSource = new BehaviorSubject<any>(null);
  currentId = this.idSource.asObservable();

  private isAdminSource = new BehaviorSubject<any>(null);
  currentIsAdmin = this.isAdminSource.asObservable();

  private tokenSource = new BehaviorSubject<any>(null);
  currentToken = this.tokenSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login = (user: any) =>
    this.http.post('http://localhost:4000/api/auth/login', user);

  signup = (user: any) =>
    this.http.post('http://localhost:4000/api/auth/signup', user);

  logout = () => {
    cookies.remove('token');
    this.tokenSource.next(null);
    this.nameSource.next(null);
    this.isAdminSource.next(false);
    this.router.navigate(['']);
  };

  setToken = () =>
    this.currentToken.subscribe((token) => this.tokenSource.next(token));

  getNameFromToken = () =>
    this.http
      .get('http://localhost:4000/api/auth', {
        headers: { authorization: cookies.get('token') },
      })
      .subscribe((res: any) => this.nameSource.next(res.name));

  getIdFromToken = () =>
    this.http
      .get('http://localhost:4000/api/auth', {
        headers: { authorization: cookies.get('token') },
      })
      .subscribe((res: any) => this.idSource.next(res.id));

  isAdmin = () =>
    this.http
      .get('http://localhost:4000/api/auth', {
        headers: { authorization: cookies.get('token') },
      })
      .subscribe((res: any) => this.isAdminSource.next(res.isAdmin));
}
