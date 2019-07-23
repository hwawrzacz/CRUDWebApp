import { Injectable } from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  baseUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'getallusers');
  }

  saveUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + 'save', user);
  }

  customQuery() {
    return this.http.get<User>(this.baseUrl + 'customquery');
  }
}
