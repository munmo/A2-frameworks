import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  public groupNames: string[] = [];
  public isAllowedToCreateGroup: boolean = false; // Initially set to false
  public isModalOpen: boolean = false;
  public pendingInterests: any[] = [];
  public selectedGroupName: string | null = null; // Changed from selectedGroupId

  createGroupForm: FormGroup = this.fb.group({
    groupName: [''],
    description: [''],
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadExistingGroups();
    this.loadPendingInterests();

    const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
    if (userRoles.includes('Super') || userRoles.includes('Group')) {
      this.isAllowedToCreateGroup = true;
    }
  }

  loadExistingGroups(): void {
    this.http.get<string[]>(BACKEND_URL + '/api/auth/addGroup')
      .subscribe({
        next: (data) => {
          this.groupNames = data;
        },
        error: (error) => {
          console.error('Error fetching groups:', error);
        }
      });
  }

  openCreateGroupModal(): void {
    this.isModalOpen = true;
  }

  closeCreateGroupModal(): void {
    this.isModalOpen = false;
  }

  createGroup(): void {
    const groupNameControl = this.createGroupForm.get('groupName');

    if (groupNameControl) {
      const groupName = groupNameControl.value;
      if (groupName) {
        this.http.post<string[]>(BACKEND_URL + '/api/auth/addGroup', { groupName })
          .subscribe({
            next: (data) => {
              this.groupNames = data;
              groupNameControl.setValue('');
            },
            error: (error) => {
              console.error('Error creating group:', error);
            },
          });
      }
    }
  }

  registerInterest(groupName: string): void {
    // Changed from groupId to groupName
    this.http.post(BACKEND_URL + '/api/auth/registerInterest', { groupName })
      .subscribe({
        next: (data) => {
          console.log('Interest registered:', data);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  loadPendingInterests(): void {
    this.http.get<any[]>(BACKEND_URL + '/api/auth/pendingInterests')
      .subscribe({
        next: (data) => {
          this.pendingInterests = data;
        },
        error: (error) => {
          console.error('Error fetching pending interests:', error);
        },
      });
  }

    // Confirm interest
  confirmInterest(userId: string, groupName: string): void { // added groupName parameter
    if (groupName !== null) {
      this.http.post(BACKEND_URL + '/api/auth/confirmInterest', { userId, groupName })
        .subscribe({
          next: (data) => {
            console.log('Interest confirmed:', data);
            this.loadPendingInterests(); // Refresh list
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
    } else {
      console.log("groupName is null. Cannot proceed.");
    }
  }

}