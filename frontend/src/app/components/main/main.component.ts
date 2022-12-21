import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Message from 'src/app/interfaces/Message';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UsersService } from 'src/app/services/users.service';

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

  isAdmin!: boolean;
  name!: any;
  users: any[] = [];
  receiver: any = null;
  message!: string;

  eliminateCurrentUserFromList = (arg: []) =>
    arg.filter((user: any) => user.name != this.name);

  sendMessage = () =>
    this.messageService.postMessage({
      message: this.message,
      reciever: this.receiver.id,
    });

  ngOnInit(): void {
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
