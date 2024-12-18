import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  story = {
    title: '',
    content: '',
    category: '',
    email: '',
    authorName: ''
  };

  constructor(private sellerService: StoryService, private router: Router) {}

  ngOnInit(): void {
    // Initialize component if needed
  }

  onSubmit(): void {
    const newStory = {
      title: this.story.title.trim(),
      content: this.story.content.trim(),
      category: this.story.category.trim(),
      email: this.story.email.trim(),
      authorName: this.story.authorName.trim(),
      date: new Date().toLocaleDateString('en-US'), // Current date
      view: 0, // Initialize views to 0
      isApproved: false // New field to indicate approval status
    };
  
    // Save the new story to the backend
    this.sellerService.postStory(newStory).subscribe(
      (response) => {
        console.log('Story successfully submitted for review!', response);
        this.router.navigate(['/']); // Redirect to home or stories page
      },
      (error) => {
        console.error('Error adding story:', error);
      }
    );
  }
}