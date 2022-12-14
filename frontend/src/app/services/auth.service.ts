import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login = (user: any) =>
    this.http.post('http://localhost:4000/api/auth/login', user);

  signup = (user: any) =>
    this.http.post('http://localhost:4000/api/auth/signup', user);
}
