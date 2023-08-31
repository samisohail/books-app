import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  private componentActive = true;
  books: Book[] = [];
  booksFound?: boolean;

  constructor(private bookService: BookService) { }
  
  ngOnInit(): void {
    
    // search and pagination could be implemented by passing params
    // API is has all the search and paging functionality ready
    // example: this.bookService.getBooks('Learning', 1);

    // this.bookService.getBooks()
    this.bookService.getBooks()
    .pipe(
      takeWhile(() => this.componentActive)
   ).subscribe({ 
      next: (data) => {
        this.books = data;
        this.booksFound = data.length > 0;
      },
      error: (error) => {
        // for now - simply console log
        console.log(error.error);
      }
    })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
