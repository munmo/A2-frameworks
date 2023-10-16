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
  userpwd: Userpwd = { username:'', email: '', password: ''}; 
  userobj: Userobj = { username: '', email: '', valid: false, roles: [], group: [] };

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
    console.log("Register button clicked");
    // if (this.registerForm.invalid) {
    //   return;
    // }

    const data = this.registerForm.value;

    this.userpwd.email = data.email;
    this.userpwd.password = data.pwd;
    this.userpwd.username = data.username;
    this.userobj.email = data.email;
    this.userobj.username = data.username;
    this.userobj.roles = data.roles;

    this.httpClient.post(BACKEND_URL + '/api/register', this.userpwd, httpOptions)
  .subscribe({
    next: (response: any) => {
      if (response.ok) {
        console.log("Response from backend:", response); //test
        console.log("Sending registration data:", data); //test
        alert('Registration successful!');
        
        // Store user details in local storage
        localStorage.setItem('userEmail', this.userobj.email);
        localStorage.setItem('username', this.userobj.username);
        localStorage.setItem('roles', JSON.stringify(this.userobj.roles)); // Convert roles to a string
        
        console.log("Navigating to login page..."); //test
        this.router.navigate(['/login']);
      } else {
        alert('Registration failed: ' + response.error);
      }
    },
    error: (error) => {
      console.error('Error during registration:', error);
      alert('Registration failed: An error occurred. Please try again.');
    }
  });}}