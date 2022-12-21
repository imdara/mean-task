import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  allUsers: any;
  name: any;

  editHandler = (id: any) => this.usersService.editUser(id);
  deleteHandler = (id: any) => this.usersService.deleteUser(id);
  eliminateCurrentUserFromList = (arg: []) =>
    arg.filter((user: any) => user.name != this.name);

  ngOnInit(): void {
    this.authService.currentName.subscribe((name) => (this.name = name));
    this.usersService.getAllUsers();
    this.usersService.allUsers.subscribe(
      (users) => (this.allUsers = this.eliminateCurrentUserFromList(users))
    );
  }
}
