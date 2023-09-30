import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userobj } from './userobj';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Login
  login(credentials: { email: string, password: string }): Observable<Userobj> {
    return this.http.post<Userobj>(`${BACKEND_URL}/api/auth/login`, credentials, httpOptions);
  }

  // Register
  register(userData: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${BACKEND_URL}/api/auth/register`, userData, httpOptions);
  }

  // Get Groups (assuming it returns an array of group names)
  getGroups(): Observable<string[]> {
    return this.http.get<string[]>(`${BACKEND_URL}/api/getGroups`);
  }

  // Add Group (assuming it takes a group name)
  addGroup(groupName: string): Observable<any> {
    return this.http.post<any>(`${BACKEND_URL}/api/addGroup`, { groupName }, httpOptions);
  }

  // Just an example for `registerInterest`:
  registerInterest(interestData: any): Observable<any> {
    return this.http.post<any>(`${BACKEND_URL}/api/registerInterest`, interestData, httpOptions);
  }
}
