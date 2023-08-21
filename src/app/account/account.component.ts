import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  username = sessionStorage.getItem('username') || "";
  birthdate = sessionStorage.getItem('birthdate') || "";
  age = Number(sessionStorage.getItem('age')) || 0;
  email = sessionStorage.getItem('email') || ""; 
  valid = Boolean(sessionStorage.getItem('valid')) || false;

  ngOnInit(){
    if(this.valid != true)
    {
      alert("You Are Not Logged In!");
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  constructor(private router: Router){}


  
}