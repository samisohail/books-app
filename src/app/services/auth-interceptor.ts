import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
    constructor(private router: Router) {} 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('token');
      
     if (token) {
       // If we have a token, we set it to the header
       request = request.clone({
          setHeaders: { Authorization: 'Bearer ' + token }
       });
    }
  
    return next.handle(request).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
              // redirect user to the logout page
              this.router.navigate(['login'], { queryParams: { message: 'Please re-login to proceed'} });
           }
        }
        return throwError(err);
      })
     )
    }
  }