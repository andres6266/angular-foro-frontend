import { Injectable } from "@angular/core";
//Rutas
import { Router, CanActivate } from "@angular/router";

//servicios
import { UserService } from "../services/user.service";

@Injectable()

export class NoIdentityGuard implements CanActivate {
    public url: string;


    constructor(private _router: Router
        , private _userService: UserService) {

    }

    canActivate() {
        let identity = this._userService.getIdentity();
        if (identity && identity.name) {
            this._router.navigate(['/inicio']);
            return false;
        } else {
            return true;
        }
    }

}