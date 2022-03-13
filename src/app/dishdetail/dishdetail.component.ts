import { Component, OnInit, ViewChild } from '@angular/core';
import { Params ,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { faChevronRight , faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    @ViewChild('cform')  cmntFormDirective: any;
  dish :Dish;
  right=faChevronRight;
  left=faChevronLeft;
  dishIds: string[];
  prev: string;
  next: string;
  cmntForm:FormGroup;
  cmnt:Comment;
  formErrors :any = {
    'author': '',
    'comment': '',
  };

  validationMessages :any= {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Comment is required.',
    }

  };
 
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb:FormBuilder) {
      this.createForm();
     }
createForm(){
  this.cmntForm=this.fb.group({
    author: ['', [Validators.required, Validators.minLength(2)]],
    rating :5,
    comment:['', [Validators.required]]
    });
    this.cmntForm.valueChanges
.subscribe(data => this.onValueChanged(data));

this.onValueChanged(); // (re)set validation messages now
}
onValueChanged(data?: any) {
  if (!this.cmntForm) { return; }
  const form = this.cmntForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}
onSubmit(){
  this.cmnt=this.cmntForm.value;
  this.cmnt.date=new Date().toString();
  this.dish.comments.push(this.cmnt);
  this.cmntForm.reset({
    author: '',
    rating :5,
    comment:''
  });
  // this.cmntFormDirective.resetForm();
}
  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    // const id = +this.route.snapshot.params['id'];
    //  this.dishservice.getDish(id.toString()).subscribe(dish => this.dish =dish);
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

}
