import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UsersService } from 'src/app/services/users.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  socket = io.connect('http://localhost:5000');
  id: any;
  roomId = 'private-chat';
  isAdmin!: boolean;
  name!: any;
  users: any[] = [];
  receiver: any;
  message!: string;
  messageList: any = [];

  userClickHandler = async (user: any) => {
    this.receiver = user;
    this.getMessagesFromThisChat(this.receiver.id);
    await this.socket.emit('join_room', this.roomId);
  };

  eliminateCurrentUserFromList = (arg: []) =>
    arg.filter((user: any) => user.name != this.name);

  getMessagesFromThisChat = async (id: any) => {
    // this.messageService
    //   .getMessages(id)
    //   .subscribe((res: any) =>
    //     res.length != 0 ? (this.messageList = res) : (this.messageList = null)
    //   );
    await this.socket.emit(
      'receive_message',
      (data: any) => (this.messageList = [...this.messageList, data])
    );
  };

  sendMessage = async () => {
    if (this.message !== '') {
      const messageObject = {
        room: this.roomId,
        from: this.id,
        content: this.message,
        to: this.receiver.id,
        createdAt:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await this.socket.emit('send_message', messageObject);
      this.messageList = [...this.messageList, messageObject];
      // this.messageService.postMessage({
      //   message: this.message,
      //   reciever: this.receiver.id,
      // });
      // this.getMessagesFromThisChat(this.id);
      this.message = '';
    }
  };

  ngOnInit(): void {
    this.authService.getIdFromToken();
    this.authService.currentId.subscribe((res) => (this.id = res));
    this.authService.getNameFromToken();
    this.authService.currentName.subscribe((name) => (this.name = name));
    this.authService.isAdmin();
    this.authService.currentIsAdmin.subscribe(
      (isAdmin) => (this.isAdmin = isAdmin)
    );
    this.usersService.getUserList();
    this.usersService.currentUsers.subscribe(
      (users: any) => (this.users = this.eliminateCurrentUserFromList(users))
    );
  }
}
