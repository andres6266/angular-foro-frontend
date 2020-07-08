import { Component, OnInit } from '@angular/core';
//Rutas
import { Router, ActivatedRoute, Params } from "@angular/router";
//Modelo
import { Topic } from "../../models/topic";
//Servicios
import { TopicService } from "../../services/topic.service";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public totalPages;
  public page;
  public next_page:number;
  public prev_page:number;
  public number_pages;;
  public pag:number;

  constructor(private _route: ActivatedRoute, private _router: Router, private _topicService: TopicService) {
    
    this.page_title = 'Temas';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.pag=1;
      var page =+ params['page'];
      

      if (!page || page == null || page == undefined) {
        page = 1
        this.prev_page=1;
        this.next_page=2;
      }

      this.getTopics(page);
    });


  }

  getTopics(page = 1) {

    this._topicService.getTopics(page).subscribe(
      response => {

        if (response.topics) {

          this.topics = response.topics;

          //Paginacion
          this.totalPages = response.totalPages;

          var number_pg = [];


          for (let i = 1; i < this.totalPages+1; i++) {

            number_pg.push(i);
          }

        



          this.number_pages = number_pg;

          if (page >= 2) {
            this.prev_page = page - 1;
          } else {
            this.prev_page = 1;
          }

          if (page < this.totalPages) {
            this.next_page = page + 1;
          } else {
            this.next_page = this.totalPages;
          }

        } else {
          this._router.navigate(['/inicio']);

        }
      },
      error => {

        console.log(error);

      }
    );
  }

}
