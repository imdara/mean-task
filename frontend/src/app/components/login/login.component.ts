import { Component, OnInit } from '@angular/core';
import LoginForm from 'src/app/interfaces/LoginForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  passwordVisibility: boolean = false;

  loginForm: LoginForm = { email: '', password: '' };

  togglePasswordVisibility = () =>
    (this.passwordVisibility = !this.passwordVisibility);

  submitHandler = () => {
    this.authService
      .login(this.loginForm)
      .subscribe((res: any) => alert(res.message));
    this.loginForm = {
      email: '',
      password: '',
    };
  };

  ngOnInit(): void {}
}
