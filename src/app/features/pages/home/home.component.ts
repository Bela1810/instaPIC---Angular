import { Component, signal } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  posts: number = 10;
  followers = 5;
  requests = 250;

  currentUser;

  galleryItems = signal([
    {id:1, url:"/assets/image_1.jpg", comments: []},
    {id:2, url:"/assets/image_2.jpg", comments: []},
    {id:3, url:"/assets/image_3.jpg", comments: []},
    {id:4, url:"/assets/image_4.jpg", comments: []},
    {id:5, url:"/assets/image_5.jpg", comments: []},
    {id:6, url:"/assets/image_6.jpg", comments: []},
    {id:7, url:"/assets/image_1.jpg", comments: []},
    {id:8, url:"/assets/image_2.jpg", comments: []}

  ])

  constructor(private userService: UserService){
    this.currentUser = userService.getUser();

  }

}
