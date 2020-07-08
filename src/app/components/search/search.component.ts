import { Component, OnInit } from '@angular/core';

//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
//Modelo
import { Topic } from "../../models/topic";
//Servicios
import { TopicService } from "../../services/topic.service";
import { global } from "../../services/global.service";


@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {

  public topics: Topic;
  public url: string;
  public page_title: string;
  public status: string
  public is_paginate:number;

  constructor(
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this.url = global.url;
    this.page_title = 'Busqueda de';


  }

  ngOnInit(): void {
  

    this._route.params.subscribe(
      params => {
      var search = params['search'];

      var replace_search=search.replace(search,params['search']);
      
      this.page_title = this.page_title + ' ' + replace_search;

      this.getTopics(replace_search);


    });

  }

  getTopics(search) {
    this._topicService.search(search).subscribe(
      response => {

        if (response.topics) {
          this.status = 'success';
          this.topics = response.topics;
          console.log(this.topics);
        }
        
      },
      error => {
        
        console.log(error);

      }
    );
  }

}
