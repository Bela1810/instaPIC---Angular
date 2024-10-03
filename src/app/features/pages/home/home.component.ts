import { Component, signal } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { GalleryItem } from '../../interfaces/gallery-item.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  followers = 5;
  requests = 250;

  user;

  galleryItems = signal<GalleryItem[]>([]);

  profilePhoto = '';

  constructor(private userService: UserService){
    this.user = userService.getUser();
    this.galleryItems.set(this.userService.getGallery(this.user().userName));
    this.profilePhoto = this.userService.getProfile(this.user().userName);
  }

  onDelete(id: string) {
    Swal.fire({
      text: "¿Está seguro de eliminar la imagen seleccionada?",
      icon: "warning",
      iconColor: "#219ebc",
      showCancelButton: true,
      confirmButtonColor: "#023047",
      cancelButtonColor: "#d00000",
      confirmButtonText: "Si",
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.galleryItems.update(items =>
          items.filter(item => item.id !== id)
        );
        this.userService.updateGallery(this.user().userName, this.galleryItems());

      }
    });

  }


  onAddComment(event:Event, id:string){
    const input = event.target as HTMLInputElement;
    if(!input.value){
      return;
    }
    this.galleryItems.update(items=> {
      let selected = items.find(item=>item.id===id);
      if(selected){
        selected.comments = [...selected.comments, input.value]
      }
      return items;
    })
    this.userService.updateGallery(this.user().userName, this.galleryItems());
    input.value = '';
  }

  onViewComments(comments: string[]) {

    let htmlContent = 'Aún no hay comentarios, se el primero!';
    if(comments.length>0){
      htmlContent = '<div>';
      comments.forEach(comment => {
        htmlContent += `<p>${comment}</p>`;
      });
      htmlContent += '</div>';
    }
    Swal.fire({
      html: htmlContent
    })
  }


}
