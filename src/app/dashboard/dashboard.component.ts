import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pendingInterests: any[] = [];
  public groups: string[] = []; // To store the list of groups

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPendingInterests();
    this.loadGroups();
  }

  // Load pending interests
  loadPendingInterests(): void {
    this.http.get<any[]>(`${BACKEND_URL}/api/pendingInterest`)
      .subscribe({
        next: (data) => {
          this.pendingInterests = data;
        },
        error: (error) => {
          console.error('Error fetching pending interests:', error);
        }
      });
  }

  // Load groups
  loadGroups(): void {
    this.http.get<string[]>(`${BACKEND_URL}/api/getGroups`)
      .subscribe({
        next: (data) => {
          this.groups = data;
        },
        error: (error) => {
          console.error('Error fetching groups:', error);
        }
      });
  }

  // Confirm interest
  confirmInterest(username: string, group: string): void {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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

  // Delete a group

  deleteGroup(groupName: string): void {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.delete(`${BACKEND_URL}/api/deleteGroup/${groupName}`, httpOptions)
      .subscribe({
        next: (data) => {
          console.log('Group deleted:', data);
          this.loadGroups(); // Refresh list of groups
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
}