import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pendingInterests: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPendingInterests();
  }

  // Pending requests - only super and group user can see
  loadPendingInterests(): void {
    this.http.get<any[]>(BACKEND_URL + '/api/pendingInterest')
      .subscribe({
        next: (data) => {
          this.pendingInterests = data;
        },
        error: (error) => {
          console.error('Error fetching pending interests:', error);
        }
      });
  }

  // Confirm
  confirmInterest(username: string, group: string): void {
    const httpOptions = {
      headers: {
        // Your headers here, e.g., 'Content-Type': 'application/json'
      }
      // other options
    };

    this.http.post(`${BACKEND_URL}/api/confirmInterest`, { username, group }, httpOptions)
      .subscribe({
        next: (data) => {
          console.log('Interest confirmed:', data);
          this.loadPendingInterests(); // Refresh list
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
}
