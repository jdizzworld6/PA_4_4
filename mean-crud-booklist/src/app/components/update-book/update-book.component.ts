import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})

export class UpdateBookComponent {


  Books: any = [];
  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      // get id from url :id
      const id = this.activatedRouter.snapshot.paramMap.get('id');
      // loop through res and save data with id of id in object
      Object.values(res).forEach(item => {
        if (item._id == id) {
          console.log(item.isbn)
          // set item.isbn to a public variable
          this.bookForm.patchValue({ isbn: item.isbn });
          this.bookForm.patchValue({ title: item.title });
          this.bookForm.patchValue({ author: item.author });
          this.bookForm.patchValue({ description: item.description });
          this.bookForm.patchValue({ published_year: item.published_year });
          this.bookForm.patchValue({ publisher: item.publisher });
        }
      });
    });

  }

  bookForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private activatedRouter: ActivatedRoute
  ) {
    this.bookForm = this.formBuilder.group({
      isbn: [],
      title: [],
      author: [],
      description: [],
      published_year: [],
      publisher: []
    })
  }

  onSubmit(): any {

    this.crudService.DeleteBook(this.activatedRouter.snapshot.paramMap.get('id')).subscribe({
      next: (res) => {
        console.log('Book deleted successfully:', res);
      },
      error: (err) => {
        console.error('Error deleting book:', err);
      }
    });
    this.crudService.AddBook(this.bookForm.value)
      .subscribe({
        error: (err) => console.log(err)
      })
    this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
  }
}

