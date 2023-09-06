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
  userpwd: Userpwd = {username: "", email: this.email, password: this.pwd};
  userobj: Userobj = {username: "", email: this.userpwd.email, valid: false, roles:[''], group:['']};

  constructor(private router: Router, private httpClient: HttpClient){}

  ngOnInit()
  {
    
  }


  public checkValid() {
  this.userpwd.email = this.email;
  this.userpwd.password = this.pwd;

  this.httpClient.post(BACKEND_URL + '/api/auth/login', this.userpwd, httpOptions)
    .subscribe((data: any) => {
      if (data.ok) {
        const userData = data.userData;
        this.userobj.username = userData.username;
        this.userobj.email = userData.email;
        this.userobj.valid = true;
        this.userobj.roles = userData.roles;
        this.userobj.group = userData.group;

        localStorage.setItem('username', this.userobj.username);
        localStorage.setItem('email', this.userobj.email);
        localStorage.setItem('valid', this.userobj.valid.toString());
        localStorage.setItem('roles', JSON.stringify(this.userobj.roles));
        localStorage.setItem('group', JSON.stringify(this.userobj.group));
        this.router.navigate(['/home'], { replaceUrl: true });
      } else {
        alert("Username and Password Credentials Do Not MATCH!");
      }
    
    });
}
}