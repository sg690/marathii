import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../services/story.service'; // Adjust the path if necessary
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  story: any = null; // Object to hold the fetched story details

  constructor(
    private route: ActivatedRoute, 
    private storyService: StoryService
  ) {}

  ngOnInit(): void {
    // Get the story ID from the route and fetch details
    const storyId = this.route.snapshot.paramMap.get('id');
  if (storyId) {
    this.fetchStoryDetails(storyId);
  } else {
    console.error('No story ID found in route parameters');
  }
    
  }

  // Fetch story details by ID
  fetchStoryDetails(_id: string): void {
    this.storyService.getStoryById(_id).pipe(
      catchError(err => {
        console.error('Error fetching story details:', err);
        return of(null); // Return null to avoid breaking the application
      })
    ).subscribe(data => {
      if (data) {
        this.story = data;
        this.updateStoryViewCount(_id); // Update view count
      } else {
        console.error('Story not found');
      }
    });
  }

  // Increment and update the story's view count
  updateStoryViewCount(id: String): void {
    if (this.story) {
      const updatedStory = { ...this.story, view: this.story.view + 1 };

      this.storyService.updateStory(id, updatedStory).pipe(
        catchError(error => {
          console.error('Error updating view count:', error);
          return of(null); // Handle error gracefully
        })
      ).subscribe((response: any) => {
        console.log('View count updated:', response);
      });
    }
  }
}