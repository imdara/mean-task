import { Component, OnInit } from '@angular/core';
import Message from 'src/app/interfaces/Message';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  name: any;
  message: Message = { from: '', to: '', content: '' };
  users: any[] = [];
  receiver: any = null;

  eliminateCurrentUserFromList = (arg: []) =>
    arg.filter((user: any) => user.name != this.name);

  ngOnInit(): void {
    this.authService.getNameFromToken();
    this.authService.currentName.subscribe((name) => (this.name = name));
    this.usersService.getUserList();
    this.usersService.currentUsers.subscribe(
      (users: any) => (this.users = this.eliminateCurrentUserFromList(users))
    );
  }
}
