import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { ContainerComponent } from './components/container.component';
import { BooksListComponent } from './components/book/books-list/books-list.component';
import { AddBookComponent } from './components/book/add-book/add-book.component';
import { AuthGuard } from './components/guards/auth.guard';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  { 
    path: 'home', component: ContainerComponent,
    children: [
      {path: 'books', component: BooksListComponent}
    ]
  },
  { path: 'book/add', component: AddBookComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
