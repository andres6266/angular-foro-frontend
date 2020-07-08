import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

//Modelos
import { User } from "../models/user";
import { Topic } from "../models/topic";

//Url global
import { global } from "./global.service";

@Injectable()

export class TopicService {
    public url: string;


    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    add(topic, token): Observable<any> {
        let params = JSON.stringify(topic);

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.post(this.url + 'topic', params, { headers: headers });
    }

    getTopicsByUser(userId): Observable<any> {

        if(userId){

            let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
            return this._http.get(this.url + 'user-topics/' + userId, { headers: headers });
        }else{
            console.log('No hay temas');
            
        }
    }

    
    update(token, id, topic): Observable<any> {
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.put(this.url + 'topic/' + id, params, { headers: headers });
    }
    

    delete(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.delete(this.url + 'topic/' + id, { headers: headers });
    }

    
    getTopics(page=1):Observable<any>{
        return this._http.get(this.url+'topics/'+page);
    }

    
    getTopic(id): Observable<any> {
        return this._http.get(this.url + 'topic/' + id);
    }
    
    search(searchString): Observable<any> {
        return this._http.get(this.url + 'search/' + searchString);
    }



    
}