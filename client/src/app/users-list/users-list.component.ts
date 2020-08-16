import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public users = [];
  public userNameSearch = '';
  public success_message = null;
  public error_message = null;

  constructor(private _usersService: UsersService, public router: Router) {
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
        this.getUsers();
        this.success_message = data['message'];
      },
      error => {
        this.error_message = error.error['message'];
      }
    );
    setTimeout(function(){
      let dom_elements = document.getElementsByClassName('alert');
      while (dom_elements.length > 0){
        dom_elements[0].remove();
      }
    }, 5000);
  }

  searchUser(){
    this._usersService.searchByUsername(this.userNameSearch).subscribe(
      data => {
        this.users = data;
        if (this.users.length === 0){
          alert('User not found');
        }
      },
      error => {
        console.log(error);
      }
    )
    this.userNameSearch = "";
  }

}
