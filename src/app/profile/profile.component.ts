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
  birthdate = localStorage.getItem('birthdate') || "";
  age = Number(localStorage.getItem('age')) || 0;
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

    if(this.birthdate != "")
    {
      const birthTime = this.birthdate.split('/');
      const newDate = `${birthTime[2]}-${birthTime[1]}-${birthTime[0]}`;
      this.birthObj = newDate;
    }
  }

  saveDetails()
  {
    const birthTime = this.birthObj.split('T')[0].split('-');
    this.birthdate = `${birthTime[2]}/${birthTime[1]}/${birthTime[0]}`;
    localStorage.setItem('username', this.username);
    localStorage.setItem('birthdate', this.birthdate);
    localStorage.setItem('age', this.age.toString());
    localStorage.setItem('email', this.email);
    this.router.navigate(['/account'], { replaceUrl: true });
  }
}