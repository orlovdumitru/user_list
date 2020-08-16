import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {

  constructor(private _usersService: UsersService) { }

  // @Output() createUser = new EventEmitter();

  public user: User;
  public message: string = '';

  resetUser(){
    this.user = {
      'id': -1,
      'userName': '',
      'firstName': '',
      'lastName': '',
      'email': '',
    };
  }

  ngOnInit() {
    this.resetUser();
  }

  createNewUser(){
    // this.createUser.emit(this.user);
    this._usersService.createUser(this.user).subscribe(
      data =>{
        // console.log(data);
        this.message = data['message'];
        this.resetUser();
      },
      error =>{
        // console.log(error.error['message']);
        this.message = error.error['message'];
      }
    );
  }

}
