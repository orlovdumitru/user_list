import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public users = [];

  constructor(private _usersService: UsersService) {
    this.getUsers();
   }

  ngOnInit() {
  }

  getUsers(){
    this._usersService.getUsers()
    .subscribe(
      data => {
        this.users = data;
      },
      error =>{
        console.log(error);
      }
    );
  }

  removeUser(id){
    this._usersService.removeUser(id)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }


}
