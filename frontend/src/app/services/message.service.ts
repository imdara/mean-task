import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  postMessage = (data: any) =>
    this.http
      .post(`/api/messages/to/${data.reciever}`, data.message)
      .subscribe((res) => console.log(res));

  getMessages = (reciever: any) =>
    this.http
      .get(`api/messages/to/${reciever}`)
      .subscribe((res) => console.log(res));
}
