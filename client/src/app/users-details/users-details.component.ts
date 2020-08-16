import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  public user: User = null;

  constructor(private _usersService: UsersService, private route: ActivatedRoute) { 
  }

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
        });
  }

}
