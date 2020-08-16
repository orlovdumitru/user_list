import { Component, OnInit, Output } from '@angular/core';
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
  public success_message: string = '';
  public error_message: string = '';

  resetUser(){
    this.user = {
      'id': -1,
      'userName': '',
      'firstName': '',
      'lastName': '',
      'email': '',
      'status': '',
    };
  }

  ngOnInit() {
    this.resetUser();
  }

  createNewUser(){
    this._usersService.createUser(this.user).subscribe(
      data =>{
        this.success_message = data['message'];
        this.resetUser();
      },
      error =>{
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

}
