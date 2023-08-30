import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { CreateBookRequest } from '../models/create-book-request';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly apiUrl = 'https://localhost:7098/book';

  constructor(private http: HttpClient) { }

  getBooks = (search?: string, page?: number) => 
    this.http.get<Book[]>(`${this.apiUrl}/list/${search}/${page}`);

  create = (payload: CreateBookRequest) =>
    this.http.post(this.apiUrl, payload);

}
