import { Component, OnInit } from '@angular/core';
//Modelos
import { User } from "../../models/user";
import { Topic } from "../../models/topic";

//Servicios
import { UserService } from "../../services/user.service";
import { TopicService } from "../../services/topic.service";
import { global } from "../../services/global.service";

//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit {

  public url: string;
  public user: User;
  public topics: Topic;
  public status: string;
  public page_title: string;
  public no_topics:boolean;

  constructor(
    private _userService: UserService,
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.no_topics=false;
    this.url = global.url;
    this.page_title = 'Mi perfil';
  }

  ngOnInit(): void {

    this._route.params.subscribe(
      params => {

        var userId = params['id'];

        this.getUser(userId);
        this.getTopics(userId);

      }
    );

  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        if (response.user) {
          this.user = response.user;
        } 
      },
      error => {
        //this._router.navigate(['/usuarios']);
        console.log(error);
        this.no_topics=true;

      }
    );
  }

  getTopics(userId) {

    this._topicService.getTopicsByUser(userId).subscribe(
      response => {

        if (response.topics && response.topics.length >= 1) {
          this.topics = response.topics;
        }
        
      },
      error => {
        //this._router.navigate(['/usuarios']);
        console.log(error);
        this.no_topics=true;
      }
    );

  }
}
