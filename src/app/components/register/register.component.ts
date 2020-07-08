import { Component, OnInit } from '@angular/core';
//mododelo de usuario
import { User } from "../../models/user";
//Cargar servicio de usuario para realizar peticiones ajax
import { UserService } from "../../services/user.service";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(private _userService: UserService) {
    this.page_title = 'Registro de usuario';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {


  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'success';
          //Limpiar formulario
          form.reset();
        } else {
          this.status = 'error';
        }

        console.log(response.user);
        console.log(this.status);
        
      },
      error => {
        console.log(error);

      }
    );

  }

}
