import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../../../auth/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})

export class NewPostComponent {

  user;
  uploadedUrl='';

  constructor(private postsService:PostsService, private userService:UserService){
    this.user = userService.getUser();

  }


  async onUpload(event:Event){
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Muestra el indicador de carga
      }
    });
    const fileName = uuidv4();
    const input= event.target as HTMLInputElement;
    if(input.files!.length <= 0){
      return;
    }
    const file:File = input.files![0];
    this.postsService.uploadFile(file,this.user().userName, fileName)
    .then(response =>{
      console.log(response);
      this.uploadedUrl = response;
      this.userService.saveImage(fileName, this.uploadedUrl, this.user().userName);
      Swal.close();
    }).catch(error=>{
      Swal.close();
        Swal.fire('Error', error.message, 'error');
    });
    
  }

  /**async va siempre con un await */


}




