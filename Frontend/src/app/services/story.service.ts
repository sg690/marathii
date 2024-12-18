import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { story } from '../../../story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  private apiUrl = 'https://marathii-backend.onrender.com';
  private Url = 'https://marathii-backend.onrender.com/api/';

    constructor(private http: HttpClient) {}


    getStories(): Observable<any[]> {
      return this.http.get<any[]>(this.Url);
    }
  
    getStoryById(_id: String): Observable<any> {
      return this.http.get<any>(`${this.Url}/${_id}`);
    }
  
    // Update an existing story
    updateStory(_id: String, story: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}api/update/${_id}`, story);
    }
  
    postStory(story: any): Observable<any> {
      return this.http.post<any>(this.apiUrl+'api/add', story);
    }
  
    searchProduct(query: string) {
      console.warn(query);
      
      return this.http.get<story[]>(`${this.apiUrl}?q=${query}&_limit=5`
      );
    }
  
}
