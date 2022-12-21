import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  postMessage = (data: any) =>
    this.http
      .post(
        `http://localhost:4000/api/messages/to/${data.reciever}`,
        { message: data.message },
        {
          headers: { authorization: cookies.get('token') },
        }
      )
      .subscribe((res) => console.log(res));

  getMessages = (reciever: any) =>
    this.http
      .get(`http://localhost:4000/api/messages/to/${reciever}`, {
        headers: { authorization: cookies.get('token') },
      })
      .subscribe((res) => console.log(res));
}
