import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from "./services/user.service";
//Redireccion de rutas
import { Router,ActivatedRoute,Params } from "@angular/router";
import { global } from "./services/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit,DoCheck {
  public title = 'Foro en Angular';
  public identity;
  public token;
  public url:string;
  public searchSomething;

  constructor(
    private _userService: UserService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url=global.url;
  }

  //Evento cuando se carga un componente
  ngOnInit() {
    console.log(this.identity);
    console.log(this.token);
    
  }
  
  //Actualiza el componentes si hay cambios
  ngDoCheck(){
  
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity=null;
    this.token=null;
    this._router.navigate(['/inicio']);

  }

  searchTopic(){
    this._router.navigate(['/buscar',this.searchSomething]);
  }
}
