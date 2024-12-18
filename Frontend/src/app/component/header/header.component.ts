import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { StoryService } from '../../services/story.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  searchTerm: string = '';
  isNavbarVisible = false;
  topCategories: string[] = [];
  trendingStories: any[] = [];
  recentStories: any[] = [];
  sidebarActive: boolean = false;

  constructor(private router: Router,private storyService: StoryService) {}

  ngOnInit() { 
    this.fetchSidebarData();
   }
  fetchSidebarData() {
    this.storyService.getStories().subscribe(
      (stories) => {
        if (stories && stories.length > 0) {
          const categories = Array.from(new Set(stories.map((story: any) => story.category)));
          this.topCategories = categories.slice(0, 5);
          this.trendingStories = stories.sort((a: any, b: any) => b.view - a.view).slice(0, 5);
          this.recentStories = stories.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
        }
      },
      (error) => {
        console.error('Error fetching sidebar data:', error);
      }
    );
  }

  onSearch(searchTerm: string): void {
    if (searchTerm.trim()) {
      // Navigate to the search results page with the query parameter
      this.router.navigate(['/results'], { queryParams: { search_query: searchTerm } });
      this.searchTerm = '';
    }
  }

  toggleNavbar(): void {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }

  navigateToStory(storyId: string): void {
    this.router.navigate(['/story', storyId]);
  }

  onCategoryClick(category: string): void {
    // Navigate to the new path and trigger filtering
    if (category.trim()) {
      // Navigate to the search results page with the query parameter
      this.router.navigate(['/results'], { queryParams: { search_query: category } });
      
    }
  }
  
}
