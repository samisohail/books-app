import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BooksListComponent } from './components/book/books-list/books-list.component';
import { LoginComponent } from './components/auth/login.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './components/container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor';
import { AddBookComponent } from './components/book/add-book/add-book.component';
import { AuthGuard } from './components/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    LoginComponent,
    ContainerComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true  },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
