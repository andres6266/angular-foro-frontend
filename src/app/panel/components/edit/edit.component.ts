import { Component, OnInit } from '@angular/core';
//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
//Modelo
import { Topic } from "../../../models/topic";
//Servicios
import { UserService } from "../../../services/user.service";
import { TopicService } from "../../../services/topic.service";

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {
  public page_title: string;
  public topic: Topic;
  public identity;
  public token;
  public status;
  public edit:boolean;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Crear nuevo Tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
    this.edit=false;
  }

  ngOnInit(): void {
    this.getTopic();
  }

  //Conseguir id y rellenar el formulario
  getTopic() {
    this._route.params.subscribe((params: Params) => {
      let id = params['id'];
      console.log('idtopico' + id);

      this._topicService.getTopic(id).subscribe(
        response => {
          if (!response.topic) {
            //redireccionar
            this._router.navigate(['/panel']);
          } else {
            this.topic = response.topic;
          }
        },
        error => {
          console.log(error);

        }
      );

    });
  }

  onSubmit(form) {

    var id = this.topic._id;


    this._topicService.update(this.token, id, this.topic).subscribe(
      response => {
        if (response) {
          this.edit=true;
          this.status = 'success';
        


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
