import { Component, OnInit } from '@angular/core';
import SignupForm from 'src/app/interfaces/SignupForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) {}

  passwordVisibility: boolean = false;

  signupForm: SignupForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  togglePasswordVisibility = () =>
    (this.passwordVisibility = !this.passwordVisibility);

  submitHandler = () => {
    this.authService
      .signup(this.signupForm)
      .subscribe((res: any) => alert(res.message));
    this.signupForm = { firstName: '', lastName: '', email: '', password: '' };
  };

  ngOnInit(): void {}
}
