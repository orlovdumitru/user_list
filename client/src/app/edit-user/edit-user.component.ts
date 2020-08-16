import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public user: User = null;
  constructor(private _usersService: UsersService, private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userDetails(params['id']);
    });
  }

  userDetails(id){
    this._usersService.getUser(id)
      .subscribe(
        data => {
          this.user = data;
        }, 
        error =>{
          console.log(error);
        }
      );
  }

  updateUser(){
    this._usersService.updateUser(this.user).subscribe(
      data => {
        this._router.navigate([""]);
      },
      error => {
        console.log(error);
      }
    );
  }

}
