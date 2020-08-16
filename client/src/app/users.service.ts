import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users_url: string = 'http://localhost:8000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this._users_url);
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(`${this._users_url}/${id}`);
  }

  createUser(user: User){
    console.log(`${this._users_url}/`);
    return this.http.post(`${this._users_url}/`, {'user': user});
  }

  removeUser(id){
    return this.http.delete(`${this._users_url}/${id}`);
  }
}
