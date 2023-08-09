import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = "";
  pwd = "";

  users = [{"email": "abc@gmail.com", "pwd": "123"}, {"email": "def@gmail.com", "pwd": "123"}, {"email": "ghi@gmail.com", "pwd": "123"}];
  valid = false;

  constructor(private router: Router){}

  ngOnInit()
  {

  }

  checkValid()
  {
    console.log("hi");
    for(let i =0; i < this.users.length; i++)
    {
      if(this.email == this.users[i].email && this.pwd == this.users[i].pwd)
      {
        alert("Success!");
        this.valid = true;
        break;
      }
    }

    if(this.valid != true)
    {
      alert("Error!! Does not Match Credentials");
      this.email = "";
      this.pwd = "";
    }
    else
    {
      this.router.navigate(['/account'], { replaceUrl: true });
    }

  }
 


}