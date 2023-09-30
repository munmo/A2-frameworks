import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export interface Observer<T>
{
  closed? :boolean;
  next: (value:T) => void;
  error: (err: any) => void;
  complete: () => void;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat';
  paramsub: any;
  public valid: boolean = false;
  //newValid$: Observable<boolean> = of(false);

  constructor(private router:Router){}

  ngOnInit()
  {
  
    this.valid = Boolean(localStorage.getItem('valid')) || false;


    if(this.valid == true)
    {
      this.router.navigate(['/account'], { replaceUrl: true});
    }
    else
    {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

  }

  //Use this to check if user is logged in or not (will be called from HTML) 
  isLoggedIn()
  {
    return Boolean(localStorage.getItem('valid')) || false;
  }
isAdmin(): boolean {
    const roleStr = localStorage.getItem('roles');
    if (!roleStr) {
        return false;
    }
    
    try {
        const roles = JSON.parse(roleStr);
        return roles.includes('Super') || roles.includes('Group');
    } catch (error) {
        console.error("Error parsing roles:", error);
        return false;
    }
}




  logOut()
  {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  group()
  {
    this.router.navigate(['/chat'], { replaceUrl: true });
  }

  userLog()
  { 
    this.valid = Boolean(localStorage.getItem('valid')) || false;

    console.log(this.valid);
    if(this.valid == true)
    {
      alert("You are already logged In!")
      this.router.navigate(['/account'], { replaceUrl: true });
    }
    else
    {
      alert("You Are Already On the Login Page");
    }
  }
}