import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
};

import {Userpwd} from "../userpwd";
import {Userobj} from "../userobj";

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  pwd = "";
  userpwd: Userpwd = {email: this.email, password: this.pwd};
  userobj: Userobj = {username: "", birthdate: "", age: 0, email: this.userpwd.email, valid: false}

  constructor(private router: Router, private httpClient: HttpClient){}

  ngOnInit()
  {
    
  }


  public checkValid()
  {
    this.userpwd.email = this.email;
    this.userpwd.password = this.pwd;
    this.httpClient.post(BACKEND_URL + '/api/auth', this.userpwd, httpOptions)
    .subscribe((data:any) => {
      alert(JSON.stringify(this.userpwd));
      if(data.ok)
      {
        const userData = data.userData;
        this.userobj.username = userData.username;
        this.userobj.birthdate = userData.birthdate;
        this.userobj.age = userData.age;
        this.userobj.email = userData.email;
        this.userobj.valid = true;
        console.log(userData);

        sessionStorage.setItem('username', this.userobj.username);
        sessionStorage.setItem('birthdate', this.userobj.birthdate);
        sessionStorage.setItem('age', this.userobj.age.toString());
        sessionStorage.setItem('email', this.userobj.email);
        sessionStorage.setItem('valid', this.userobj.valid.toString());
        this.router.navigate(['/home'], { replaceUrl: true });
      }
      else
      {
        alert("Username and Password Credentials Do Not MATCH!");
      }


      
    })
  }}