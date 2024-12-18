import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Router } from '@angular/router';
import { StoryService } from '../../services/story.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  allStories: any[] = [];
  filteredStories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {
    // Get search query from URL
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['search_query'] || '';
      this.fetchStories();
    });
  }

  fetchStories(): void {
    this.storyService.getStories().subscribe((stories) => {
      this.allStories = stories;

      // Filter stories based on title or category
      this.filteredStories = this.allStories.filter((story) =>
        story.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        story.category.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }

  truncateContent(content: string, maxLength: number = 100): string {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  }

  navigateToStory(id: string): void {
    // Redirect to a detailed story page (adjust the route as necessary)
    this.router.navigate(['/story', id]);
  }
}
