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
  isModalOpen = false;

  createGroupForm: FormGroup = this.fb.group({
    groupName: [''],
    description: [''],
  });

  isAllowedToCreateGroup: boolean = false; // Updated to a boolean
  groupNames: string[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    
    // Retrieve user roles from localStorage
    const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');

    // Check if the user has "Super" or "Group" role
    if (userRoles.includes('Super') || userRoles.includes('Group')) {
      this.isAllowedToCreateGroup = true;
    }

//     this.loadExistingGroups();
// }

// loadExistingGroups(): void {
//   this.http.get<string[]>(BACKEND_URL + '/api/auth/addGroup')
//     .subscribe({
//       next: (data) => {
//         this.groupNames = data;
//       },
//       error: (error) => {
//         console.error('Error fetching groups:', error);
//       }
//     });

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

console.log("Group Name:", groupName); //check


      if (groupName) {
        this.http
          .post<string[]>(BACKEND_URL + '/api/auth/addGroup', { groupName })
          .subscribe({
            next: (data) => {
              this.groupNames = data;
              groupNameControl.setValue('');
            },
            error: (error) => {
              console.error('Error creating group:', error); // ERROR
            },
          });
      } else {
        console.log('Group name cannot be empty.');
      }
    } else {
      console.log('Group name control not found.');
    }
  }
}
