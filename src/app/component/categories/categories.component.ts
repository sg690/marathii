import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  
  category: string = '';
  filteredStories: any[] = [];

  constructor(private route: ActivatedRoute, private storyService: StoryService) {}

  ngOnInit(): void {
    // Fetch the selected category from the route parameters
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.filterStoriesByCategory(this.category);
    });
  }

  filterStoriesByCategory(selectedCategory: string): void {
    this.storyService.getStories().subscribe(
      (stories) => {
        // Filter stories that match either "category" or "englishCategory"
        this.filteredStories = stories.filter(
          (story: any) =>
            story.category.toLowerCase() === selectedCategory.toLowerCase() ||
            story.englishCategory.toLowerCase() === selectedCategory.toLowerCase()
        );
      },
      (error) => {
        console.error('Error fetching stories:', error);
      }
    );
  }
}
