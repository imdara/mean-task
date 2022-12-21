import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersSource = new BehaviorSubject<any>(null);
  currentUsers = this.usersSource.asObservable();

  private allUsersSource = new BehaviorSubject<any>(null);
  allUsers = this.allUsersSource.asObservable();
  constructor(private http: HttpClient) {}

  getUserList = () =>
    this.http
      .get('http://localhost:4000/api/all')
      .subscribe((res: any) => this.usersSource.next(res));

  getAllUsers = () =>
    this.http
      .get('http://localhost:4000/api/auth/admin', {
        headers: { authorization: cookies.get('token') },
      })
      .subscribe((res: any) => this.allUsersSource.next(res));

  editUser = (id: string) =>
    this.http
      .put(`http://localhost:4000/api/auth/admin/${id}`, {
        headers: { authorization: cookies.get('token') },
      })
      .subscribe((res: any) => console.log(res));

  deleteUser = (id: string) =>
    this.http
      .delete(`http://localhost:4000/api/auth/admin/${id}`, {
        headers: { authorization: cookies.get('token') },
      })
      .subscribe((res: any) => console.log(res));
}
