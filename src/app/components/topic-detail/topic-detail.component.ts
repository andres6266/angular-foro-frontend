import { Component, OnInit } from '@angular/core';
//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
//Modelo
import { Topic } from "../../models/topic";
//Servicios
import { TopicService } from "../../services/topic.service";
import { CommentService } from "../../services/comment.service";
import { UserService } from "../../services/user.service";
//Modelo
import { Comment } from "../../models/comment";

import { global } from "../../services/global.service";
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [TopicService, UserService, CommentService]
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic;
  public comment: Comment;
  public identity;
  public token;
  public status: string;
  public url: string;
  public user:User;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService) {

    this.url = global.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.comment = new Comment('', '', '', this.identity._id);

  }

  ngOnInit(): void {
    this.getTopic();
  }

  getTopic() {
    //Recoger el parametro id de la url 
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._topicService.getTopic(id).subscribe(
        response => {
          if (response.topic) {
            this.topic = response.topic;
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);

        }
      );

    });
  }

  onSubmit(form) {
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
      response => {
        if (!response.topic) {
          this.status = 'error'
        } else {
          this.status = 'success';
          this.topic = response.topic;
          console.log(response.topic);
          form.reset();


        }
      },
      error => {
        this.status = 'error';
        console.log(error);

      }
    );


  }

  deleteComment(id) {
    this._commentService.delete(this.token, this.topic._id, id).subscribe(
      response => {
        this.status = 'success';
        this.topic = response.topic;
        console.log(response.topic);
        this.getTopic();
      },
      error => {
        console.log(error);

      }
    );
  }


}
