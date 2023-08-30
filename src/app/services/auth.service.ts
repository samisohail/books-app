import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user?: User;

  private readonly apiUrl = 'https://localhost:7098';
  
  constructor(private http: HttpClient) {
  }

  login = (payload: LoginRequest) => 
    this.http.post<User>(`${this.apiUrl}/user/login`, payload)
    .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
      return user;
  }));

  isLoggedIn(): boolean {
    if(this.user && this.user.token !== undefined) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.user = undefined;
  }

}
