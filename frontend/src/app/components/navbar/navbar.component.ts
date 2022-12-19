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
  name: any;
  token: any;
  constructor(private authService: AuthService) {}

  logoutHandler = () => {
    cookies.remove('token');
    this.token = null;
  };

  ngOnInit(): void {
    this.authService.getNameFromToken();
    this.authService.currentName.subscribe((name) => (this.name = name));
    this.authService.setToken(this.token);
    this.authService.currentToken.subscribe((token) => (this.token = token));
  }
}
