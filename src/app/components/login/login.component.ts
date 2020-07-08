import { Component, OnInit } from '@angular/core';
//modelo
import { User } from "../../models/user";
//Servicio de usuario
import { UserService } from "../../services/user.service";
import { global } from "../../services/global.service";

//para redireccionar rutas
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.page_title = 'Inicio de sesion';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    //Conseguir objeto de usuario logueado
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'success';
          //Se guarda el usuario en una propiedad
          this.identity = response.user;
          //Guardar en datos locales la identidad de usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //Conseguir el token del usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
              if (response.token) {
                this.token = response.token;
                //Guardar en datos locales el token 
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this._router.navigate(['/inicio']);

              } else {
                this.status = 'error';
              }
            },
            error => {
              console.log(error);

            });

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
