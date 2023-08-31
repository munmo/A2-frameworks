import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Userpwd} from "../userpwd";
import {Userobj} from "../userobj";


const BACKEND_URL = 'http://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  email = '';
  pwd = '';
  userpwd: Userpwd = { email: this.email, password: this.pwd };
  userobj: Userobj = { username: '', email: this.userpwd.email, valid: false, roles: [''] };

  isModalOpen = false;

  newGroupData: {
    groupName: string;
    description: string;
    users: string[];
    newUser: string;
  } = {
    groupName: '',
    description: '',
    users: [],
    newUser: ''
  };

  createGroupForm: FormGroup = new FormGroup({});
  newUserControl: FormControl = new FormControl('');
  isAllowedToCreateGroup: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
  this.createGroupForm = this.fb.group({
    groupName: [''],
    description: ['']
  });

  this.isAllowedToCreateGroup = this.fetchUserRoles(); // Call the method and assign the result
}

  fetchUserRoles(): Observable<boolean> {
    return this.http.get<any>(BACKEND_URL + '/api/auth/users').pipe(
      map(user => user.roles.includes('Super') || user.roles.includes('Group')),
      catchError(error => {
        console.error('Error fetching user data:', error);//ERROR HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return of(false);
      })
    );
  }

  openCreateGroupModal(): void {
    this.isModalOpen = true;
  }

  closeCreateGroupModal(): void {
    this.newGroupData = {
      groupName: '',
      description: '',
      users: [],
      newUser: ''
    };
    this.createGroupForm.reset();
    this.isModalOpen = false;
  }

  addUserToGroup(): void {
    this.newGroupData.users.push(this.newGroupData.newUser);
    this.newGroupData.newUser = '';
  }
  createGroup(): void {
    if (this.isAllowedToCreateGroup) {
      const groupData = this.createGroupForm.value;
      groupData.users = this.newGroupData.users;

      this.http.post<any>(BACKEND_URL + '/api/auth/addGroup', groupData).subscribe(
        response => {
          console.log('Group created successfully:', response);
          this.closeCreateGroupModal();
        },
        error => {
          console.error('Error creating group:', error);
        }
      );
    } else {
      console.log('You do not have permission to create a group.');
    }
  }
}