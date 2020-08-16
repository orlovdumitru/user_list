import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users_url: string = 'http://localhost:8000/users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this._users_url);
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(`${this._users_url}${id}`);
  }

  createUser(user: User){
    const head_option = {"content-type": "application/json"};
    const data = JSON.stringify(user);
    return this.http.post(this._users_url, data, {'headers': head_option});
  }

  removeUser(id){
    return this.http.delete(`${this._users_url}${id}/remove/`);
  }

  searchByUsername(user_name): Observable<User[]>{
    return this.http.get<User[]>(`${this._users_url}?q=${user_name}`);
  }

  updateUser(user: User){
    const head_option = {"content-type": "application/json"};
    const data = JSON.stringify(user);
    return this.http.put(`${this._users_url}${user.id}/`, data, {'headers': head_option});
  }
}
