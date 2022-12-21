import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAdmin!: boolean;
  name: any;
  token: any;
  constructor(private authService: AuthService) {}

  logoutHandler = () => {
    this.authService.logout();
  };

  ngOnInit(): void {
    this.authService.getNameFromToken();
    this.authService.isAdmin();
    this.authService.currentIsAdmin.subscribe(
      (isAdmin) => (this.isAdmin = isAdmin)
    );
    this.authService.currentName.subscribe((name) => (this.name = name));
    this.authService.currentToken.subscribe((token) => (this.token = token));
  }
}
