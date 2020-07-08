import { Component, OnInit } from '@angular/core';
//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";

import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';
import { global } from 'src/app/services/global.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  //propiedad para subir archivos
  public afuConfig;

  public url: string;


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _http: HttpClient

  ) {
    this.page_title = 'Ajustes de Usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;

    //Subida de imagenes
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png,.gif,.jpeg",
      maxSize: "50",//Tamano de archivo en mb
      uploadAPI: {
        url: this.url + 'upload-avatar',//Segun la url indicada para subir 
        headers: {
          "Authorization": this._userService.getToken()//Conseguir el JWTOKEN
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu avatar de Usuario...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
      }
    };
  }

  ngOnInit(): void {
  }


  avatarUpload(data) {
    let data_obj = JSON.parse(data.response);

    this.user.image = data_obj.user.image;
  }



  onSubmit(Form) {
    this._userService.update(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        this.status = 'error';
        console.log(error);

      }
    );
  }

}
