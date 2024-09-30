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

  currentUser;

  galleryItems = signal<GalleryItem[]>([
    {id:1, url:"/assets/image_1.jpg", comments: []},
    {id:2, url:"/assets/image_2.jpg", comments: []},
    {id:3, url:"/assets/image_3.jpg", comments: []},
    {id:4, url:"/assets/image_4.jpg", comments: []},
    {id:5, url:"/assets/image_5.jpg", comments: []},
    {id:6, url:"/assets/image_6.jpg", comments: []},
    {id:7, url:"/assets/image_1.jpg", comments: []},
    {id:8, url:"/assets/image_2.jpg", comments: []}

  ]);


  constructor(private userService: UserService){
    this.currentUser = userService.getUser();
  }

  onDelete(id: number) {
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
          Swal.fire({
            title: "Borrado!",
            text: "Tu foto ha sido borrada",
            icon: "success"
          })
          this.galleryItems.update(items =>
            items.filter(item => item.id !== id)
          );
        }
    });
  }


  onAddComment(event: Event, id:number){
      const input = event.target as HTMLInputElement;
      const newComment = input.value;
      console.log(newComment);
      if(newComment){
        this.galleryItems.update(items=> {
          let selected = items.find(item=>item.id===id);
          selected!.comments=[...selected!.comments, newComment];
          return items;
      });
    }

    input.value='';
  }

  onViewComments(comments:string[]){
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
