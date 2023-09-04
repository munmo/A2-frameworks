import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{


  birthObj:string = "";

  username = localStorage.getItem('username') || "";
  email = localStorage.getItem('email') || ""; 
  valid = Boolean(localStorage.getItem('valid')) || false;

  constructor(private router: Router) {
  }

  
  ngOnInit()
  {
    if(this.valid != true)
    {
      alert("You Are Not Logged In!");
      this.router.navigate(['/login'], { replaceUrl: true });
    }

  
  }

  saveDetails()
  {
  
    localStorage.setItem('username', this.username);
    localStorage.setItem('email', this.email);
    this.router.navigate(['/account'], { replaceUrl: true });
  }
}