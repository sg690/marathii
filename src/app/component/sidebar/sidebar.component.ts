import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  topCategories: string[] = [];
  trendingStories: any[] = [];
  recentStories: any[] = [];
  

  constructor(private storyService: StoryService,private router: Router) {}

  ngOnInit(): void {
    this.fetchSidebarData();
  }

  fetchSidebarData(): void {
    this.storyService.getStories().subscribe(
      (stories) => {
        if (stories && stories.length > 0) {
          // Get unique categories and limit to 5
          const categories = Array.from(new Set(stories.map((story: any) => story.category)));
          this.topCategories = categories.slice(0, 5);

          // Sort stories by views for trending stories
          this.trendingStories = stories
            .sort((a: any, b: any) => b.view - a.view)
            .slice(0, 5);

          // Sort stories by date for recent stories
          this.recentStories = stories
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
        }
      },
      (error) => {
        console.error('Error fetching sidebar data:', error);
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

  navigateToStory(storyId: string): void {
    this.router.navigate(['/story', storyId]);
  }
}
