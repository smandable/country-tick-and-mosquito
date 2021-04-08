import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  endpoint: string;

  form: FormGroup;
  name: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  street: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  city: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(25),
  ]);
  state: FormControl = new FormControl('');
  zip: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(5),
  ]);
  message: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(256),
  ]);
  honeypot: FormControl = new FormControl(''); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage: string; // the response message to show to the user

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      street: this.street,
      city: this.city,
      state: this.state,
      zip: this.zip,
      message: this.message,
      honeypot: this.honeypot,
    });
  }

  ngOnInit() {
    this.endpoint = 'https://formspree.io/f/myylybge';
  }

  onSubmit() {
    if (this.form.status == 'VALID' && this.honeypot.value == '') {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append('name', this.form.get('name').value);
      formData.append('email', this.form.get('email').value);
      formData.append('street', this.form.get('street').value);
      formData.append('city', this.form.get('city').value);
      formData.append('state', this.form.get('state').value);
      formData.append('zip', this.form.get('zip').value);
      formData.append('message', this.form.get('message').value);

      this.isLoading = true; // sending the post request async so it's in progress
      this.submitted = false; // hide the response message on multiple submits

      this.http.post(this.endpoint, formData).subscribe(
        (response) => {
          // choose the response message
          if (response['ok'] == true) {
            this.responseMessage =
              'Thanks for contacting us! We will get back to you soon!';
          } else {
            this.responseMessage =
              'Oops! Something went wrong... Reload the page and try again.';
          }
          this.form.enable(); // re enable the form after a success
          this.form.reset({
            name: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            message: '',
          }); //clear form fields
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          // console.log(response);
        },
        (error) => {
          this.responseMessage =
            'Oops! An error occurred... Reload the page and try again.';
          this.form.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(error);
        }
      );
    }
  }
}
