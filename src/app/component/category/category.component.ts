import { Component, EventEmitter, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: string[] = [];
  allStories: any[] = [];

  constructor(
    private storyService: StoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchStories();
  }

  fetchStories(): void {
    this.storyService.getStories().subscribe(
      (stories) => {
        this.allStories = stories;

        // Extract unique categories
        this.categories = Array.from(new Set(stories.map((story: any) => story.category)));
      },
      (error) => {
        console.error('Error fetching stories:', error);
      }
    );
  }

  

  onCategoryClick(category: string): void {
    // Navigate to the new path and trigger filtering
    if (category.trim()) {
      // Navigate to the search results page with the query parameter
      this.router.navigate(['/results'], { queryParams: { search_query: category } });
      
    }
  }

}
