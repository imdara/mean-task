import { Component, OnInit } from '@angular/core';
import Message from 'src/app/interfaces/Message';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  message: Message = { from: '', to: '', content: '' };
  users: any;

  ngOnInit(): void {
    this.usersService.getUserList().subscribe((res) => (this.users = res));
  }
}
