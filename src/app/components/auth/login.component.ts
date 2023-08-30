import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { LoginRequest } from 'src/app/models/login-request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  readonly controls = {
    email: new FormControl('david@lv.com.au', Validators.required),
    password: new FormControl('123456', Validators.required)
  };
  readonly form = new FormGroup(this.controls);

  componentActive = true;
  error = false;

  constructor(private router: Router,
    private authService: AuthService) { 
      // remove any existing token from local storage
      localStorage.removeItem('token');
    }

    signin() {
    console.log(this.form.value);
    const payload: LoginRequest = {
      username: this.controls.email.value!,
      password: this.controls.password.value!
    }

    this.authService.login(payload).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe({ 
      next: (data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['home']);
      },
      error: (error) => {
        // for now - simply console log
        console.log(error.error);
        this.error = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

}
