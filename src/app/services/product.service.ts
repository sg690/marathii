import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { story } from '../../../story.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3200/stories';

  constructor(private http: HttpClient) {}

  getStories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getStoryById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  postStory(story: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, story);
  }

  updateStory(id: number, story: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, story);
  }

  searchProduct(query: string) {
    console.warn(query);
    
    return this.http.get<story[]>(`${this.apiUrl}?q=${query}&_limit=5`
    );
  }

  

}
