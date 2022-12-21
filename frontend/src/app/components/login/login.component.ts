import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import LoginForm from 'src/app/interfaces/LoginForm';
import { AuthService } from 'src/app/services/auth.service';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  token: any;

  passwordVisibility: boolean = false;

  loginForm: LoginForm = { email: '', password: '' };

  togglePasswordVisibility = () =>
    (this.passwordVisibility = !this.passwordVisibility);

  submitHandler = () => {
    this.authService.login(this.loginForm).subscribe((res: any) => {
      alert(res.message);
      if (res.token) {
        const token = 'Bearer ' + res.token;
        cookies.set('token', token, { path: '/', maxAge: 1000 * 60 * 60 * 24 });
        this.token = token;
        this.loginForm = {
          email: '',
          password: '',
        };
        this.router.navigate(['']);
      }
    });
  };

  ngOnInit(): void {}
}
