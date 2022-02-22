import { Component, OnInit , ViewChild, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';//to track history
import { Feedback, ContactType} from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import {flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    //make sure animation occur when route changes occur
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback!: Feedback;//datamodel 
  contactType = ContactType;
  errMess!: string;
  feedbackcopy!:Feedback;
  feedbackprocess = false;
  feedbackdisplay= false;
  @ViewChild('fform') feedbackFormDirective!:  NgForm;
  visibility ='shown';

  formErrors:any= {
    'firstname': '',
    'lastname': '',
    'telnum' : '',
    'email': ''
  };

  validationMessages:any = {
    'firstname': {
      'required': 'First name is required',
      'minlength': 'First name must be at least 2 characters long',
      'maxlength': 'First name cannot be more than 25 characters'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },

  };

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private feedbackService: FeedbackService,
    @Inject('BaseURL') public BaseURL: string) { 
    this.createForm();
  }

  ngOnInit() {
    
  }
  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum:[0,[Validators.required,Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      agree:false,
      contacttype:'None',
      message:''

    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data)); //if any error is detected it will be added to js object formerrors above
    //what to do when value changes

    this.onValueChanged(); //reset form validation messages
  }

  onValueChanged(data?: any){//?-data parameter is optional
    if(!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
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
    //this.feedback = this.feedbackForm.value;
    this.feedbackcopy = this.feedbackForm.value;
    console.log(this.feedback);
    //this.feedbackcopy.comments.push(this.comment);
    this.feedbackprocess = true;
    this.feedbackService.submitFeedback(this.feedbackcopy)
    .subscribe({next:feedback => {
      this.feedback = feedback;
      this.feedbackcopy = feedback;
      this.feedbackprocess=false;
      this.feedbackdisplay = true;
      setTimeout(() => {
        this.feedback = null!;
        this.feedbackcopy = null!;
        this.feedbackdisplay = false;
      }, 5000);

      this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contattype:'None',
        message:''
      });
    },
    error: errmess =>{ this.feedback=null!; this.feedbackcopy=null!; this.errMess=<any>errmess;
    }} );
    //this.feedbackFormDirective.resetForm();
  }

}