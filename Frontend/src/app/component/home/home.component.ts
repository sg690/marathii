import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  stories: any[] = [];
  filteredStories: any[] = [];
  selectedCategory: string | null = null;

  constructor(private router: Router, private storyService: StoryService) {}

  ngOnInit(): void {
    this.fetchStories();
  }

  fetchStories(): void {
    this.storyService.getStories().subscribe(
      (data) => {
        this.stories = data;
        this.filteredStories = this.stories; // Initialize with all stories
      },
      (error) => {
        console.error('Error fetching stories:', error);
      }
    );
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.filteredStories = this.stories.filter(
      (story) => story.category === category
    );
  }

  truncateContent(content: string, wordLimit: number = 20): string {
    const words = content.split(' ');
    if (words.length <= wordLimit) {
      return content;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  truncateTittle(content: string, wordLimit: number = 8): string {
    const words = content.split(' ');
    if (words.length <= wordLimit) {
      return content;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  navigateToStory(storyId: string): void {
    // Check if storyId is a string (to prevent any potential issues)
    if (storyId) {
      this.router.navigate(['/story', storyId]);
    } else {
      console.error('Story ID is undefined or null:', storyId);
    }
  }

}
