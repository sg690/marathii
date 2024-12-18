import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {

  stories: any[] = [];

  topCategories: string[] = [];
  trendingStories: any[] = [];
  AlltrendingStories: any[] = [];
  recentStories: any[] = [];

  constructor(private storyService: StoryService,private router: Router) {}

  ngOnInit(): void {
    this.fetchStories();
    this.fetchData();
  }

  truncateContent(content: string, wordLimit: number = 20): string {
    const words = content.split(' ');
    if (words.length <= wordLimit) {
      return content;
    }
    return words.slice(0, wordLimit).join(' ') + '...'; // Append ellipsis to indicate more content
  }
  fetchStories(): void {
    this.storyService.getStories().subscribe((data) => {
      this.stories = data;
    });
  }
  
    navigateToStory(storyId: number): void {
      this.router.navigate(['/story', storyId]);
    }

  fetchData(): void {
    this.storyService.getStories().subscribe(
      (stories) => {
        if (stories && stories.length > 0) {
          // Get all categories, eliminate duplicates, and limit to 5
          const categories = Array.from(new Set(stories.map((story: any) => story.category)));
          this.topCategories = categories.slice(0, 5);

          // Sort stories by views for trending stories and take top 10
          this.trendingStories = stories
            .sort((a: any, b: any) => b.view - a.view) // Descending order of views
            .slice(0, 5);

            this.AlltrendingStories = stories
            .sort((a: any, b: any) => b.view - a.view) // Descending order of views
            .slice(0, 10);

            this.recentStories = stories
              .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Descending order of date
              .slice(0, 5);
        }
      },
      (error) => {
        console.error('Error fetching stories:', error);
      }
    );
  }
}
