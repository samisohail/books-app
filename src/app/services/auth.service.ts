import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user?: User;

  private readonly apiUrl: string;
  
  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/user`;
  }

  login = (payload: LoginRequest) => 
    this.http.post<User>(`${this.apiUrl}/login`, payload)
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
