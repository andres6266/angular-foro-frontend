import { Component, OnInit } from '@angular/core';
//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
//Modelo
import { Topic } from "../../../models/topic";
//Servicios
import { UserService } from "../../../services/user.service";
import { TopicService } from "../../../services/topic.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {
  public page_title: string;
  public topics: Array<Topic>;
  public identity;
  public token;
  public status;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = 'Listado de temas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {

    this.getTopics();
  }

  getTopics() {
    var userId = this.identity._id;
    

    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if (response.topics && response.topics.length>=1) {
          this.topics = response.topics;

          

        }
      },
      error => {
        console.log('No hay temas');
      

      }
    );
  }

  deleteTopic(id) {
    this._topicService.delete(this.token, id).subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/panel/listado']);
        
      },
      error => {
        console.log(error);

      }
    )
      ;
  }

}
