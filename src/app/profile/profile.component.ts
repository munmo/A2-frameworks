import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Uncomment this import statement

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  birthObj: string = "";
  username = localStorage.getItem('username') || "";
  email = localStorage.getItem('email') || "";
  valid = Boolean(localStorage.getItem('valid')) || false;
  avatar: File | null = null; // Property to store the selected avatar file

  constructor(private router: Router, private http: HttpClient) {} // Add HttpClient to the constructor

  ngOnInit() {
    if (this.valid != true) {
      alert("You Are Not Logged In!");
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatar = file;
    }
  }

  saveDetails() {
    // Prepare the data to send to the server, including the avatar file
    const dataToSend = {
      username: this.username,
      email: this.email,
      avatar: this.avatar, // Include the selected avatar file
    };

    // Send the data to the server using an HTTP POST request
    this.http.post('/api/updateUser', dataToSend).subscribe(
      (response) => {
        // Handle the response from the server
        console.log('User details updated successfully:', response);
      },
      (error) => {
        // Handle any errors that occurred during the request
        console.error('Error updating user details:', error);
      }
    );
  }
}
