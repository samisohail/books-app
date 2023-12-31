import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { CreateBookRequest } from '../models/create-book-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly apiUrl: string;  

  constructor(private http: HttpClient) { 
    this.apiUrl = `${environment.apiUrl}/book`;
  }

  getBooks(search?: string | null, pageNumber?: number | null) {
    // build query params for the api route
    let queryParams = '';
    if (search !== undefined) {
      queryParams = `search=${search}`
    }

    if (pageNumber !== undefined) {
      queryParams === ''
        ? queryParams = `pageNumber=${pageNumber}`
        : queryParams += `&pageNumber=${pageNumber}`
    }
    
    return this.http.get<Book[]>(`${this.apiUrl}/list?${queryParams}`);
  }

  create = (payload: CreateBookRequest) =>
    this.http.post(this.apiUrl, payload);

}
