import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSource = new BehaviorSubject<any>(null);
  currentUsers = this.usersSource.asObservable();
  constructor(private http: HttpClient) {}

  getUserList = () =>
    this.http
      .get('http://localhost:4000/api/all')
      .subscribe((res: any) => this.usersSource.next(res));
}
