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

  username = sessionStorage.getItem('username') || "";
  birthdate = sessionStorage.getItem('birthdate') || "";
  age = Number(sessionStorage.getItem('age')) || 0;
  email = sessionStorage.getItem('email') || ""; 
  valid = Boolean(sessionStorage.getItem('valid')) || false;

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
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('birthdate', this.birthdate);
    sessionStorage.setItem('age', this.age.toString());
    sessionStorage.setItem('email', this.email);
    this.router.navigate(['/account'], { replaceUrl: true });
  }
}