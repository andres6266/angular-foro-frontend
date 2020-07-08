import { Component, OnInit } from '@angular/core';

//Modelo
import { User } from "../../models/user";

//Servicios
import { UserService } from "../../services/user.service";
import { global } from "../../services/global.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  public url: string;
  public users: User;
  public status: string;
  public page_title:string;

  constructor(private _userService: UserService) {
    this.url = global.url;
    this.page_title='Companeros';
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if (response.users) {
          this.status = 'success';
          this.users=response.users;
          console.log(this.users);
          
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);

      }
    );
  }

}
