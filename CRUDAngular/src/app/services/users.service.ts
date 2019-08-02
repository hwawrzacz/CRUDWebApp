import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserBasic} from "../models/UserBasic";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  baseUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) {
  }

  getAllUsersByLogin(login: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/getallbylogin?login=' + login);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'create', user, { responseType: 'text' });
  }

  updateUser(login: string, user: User): Observable<any> {
    return this.http.put(this.baseUrl + 'update?login=' + login, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<any> {
    console.log('Deleting user: ' + user.login);
    return this.http.delete(this.baseUrl + 'delete?login=' + user.login, { responseType: 'text' });
  }

  getUserByLoginAndPassword(user: UserBasic): Observable<UserBasic> {
    return this.http.post<UserBasic>(this.baseUrl + 'login', user);
  }
}
