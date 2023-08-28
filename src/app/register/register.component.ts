import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Userpwd } from "../userpwd";
import { Userobj } from "../userobj";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userpwd: Userpwd = { email: '', password: '' }; 
  userobj: Userobj = { username: '', email: '', valid: false };

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]], 
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {}

 register() {
  const newUser = {
    username: this.registerForm.value.username,
    birthdate: null,
    age: null,
    email: this.registerForm.value.email,
    pwd: this.registerForm.value.pwd, // Use 'pwd' as the property name
    valid: false
  };

  this.httpClient.post(BACKEND_URL + '/api/auth', newUser, httpOptions)
    .subscribe({
      next: (response: any) => {
        if (response.ok) {
          console.log("Response from backend:", response);

          alert('Registration successful!');
          // Store user email in local storage
          localStorage.setItem('userEmail', newUser.email);
          console.log("Navigating to login page...");
          this.router.navigate(['/login']);
        } else {
          alert('Registration failed: ' + response.error);
          if (response.error === 'Email already registered') {
            this.registerForm.controls['email'].setErrors({ emailExists: true });
          }
        }
      },
      error: (error) => {
        console.error('Error during registration:', error);
        alert('Registration failed: An error occurred. Please try again.');
      }
    });
}

}