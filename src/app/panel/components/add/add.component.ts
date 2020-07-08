import { Component, OnInit } from '@angular/core';
//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
//Modelo
import { Topic } from "../../../models/topic";
//Servicios
import { UserService } from "../../../services/user.service";
import { TopicService } from "../../../services/topic.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent implements OnInit {

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
  }

  onSubmit(form) {
    this._topicService.add(this.topic,this.token).subscribe(
      response => {
        if (response.topicStored) {
          this.status = 'success';
          this.topic=response.topicStored;
          this._router.navigate(['/panel']);

        } else {
          this.status = 'error';
        }

        console.log(response);
        console.log(this.topic);

      },
      error => {
        console.log(error);

      }
    );

  }

}
