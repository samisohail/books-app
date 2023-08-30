import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { CreateBookRequest } from 'src/app/models/create-book-request';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnDestroy {  

  readonly controls = {
    title: new FormControl('', Validators.required),
    description: new FormControl(),
    isbn: new FormControl('', [Validators.required, Validators.maxLength(13)])
  };
  readonly form = new FormGroup(this.controls);

  componentActive = true;
  error = false;
  
  constructor(private bookService: BookService,
    private router: Router) { }

  onAdd() {
    console.log(this.form.value);

    const payload = this.form.value as CreateBookRequest;

    if (this.form.valid) {
      this.bookService.create(payload).pipe(
        (takeWhile(() => this.componentActive))
      ).subscribe({ 
        next: _ => {
          // display message
          
          this.router.navigate(['home']);
        },
        error: (error) => {
          // for now - simply console log
          console.log(error.error);
          this.error = true;
        }
      });   
    }
  }
  
  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
