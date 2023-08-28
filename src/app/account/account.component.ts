import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  username = localStorage.getItem('username') || "";
  birthdate = localStorage.getItem('birthdate') || "";
  age = Number(localStorage.getItem('age')) || 0;
  email = localStorage.getItem('email') || ""; 
  valid = Boolean(localStorage.getItem('valid')) || false;

  ngOnInit(){
    if(this.valid != true)
    {
      alert("You Are Not Logged In!");
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  constructor(private router: Router){}


  
}