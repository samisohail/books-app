import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  
  loggedIn = false;
  
  constructor(private router: Router,
    private authService: AuthService) { }
  
  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onAddBook() {
    this.router.navigate(['/book/add'])
  }
}
