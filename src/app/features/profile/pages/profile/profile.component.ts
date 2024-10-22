import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from '../../../posts/services/posts.service';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user;
  uploadedUrl='';
  selectedFile: File | null = null;
  previousProfileUrl: string | null = '';

  constructor(private postsService:PostsService, private userService:UserService){
    this.user = userService.getUser();
    this.previousProfileUrl = this.userService.getProfile(this.user().userName) || null;

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];  
    }
  }
  

  async onUploadPhoto() {

    if (!this.selectedFile) {
      Swal.fire('Error', 'Por favor selecciona un archivo antes de guardar los cambios', 'error');
      return;
    }
  
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    const fileName = uuidv4();

    if (!this.selectedFile) {
      Swal.close();
      return;
    }
  

    if (this.previousProfileUrl) {
      const urlParts = this.previousProfileUrl.split('/');
      const userName = this.user().userName; 
      const fileName = urlParts.pop(); 
      const filePath = `${userName}/${fileName}`; 
  
      if (filePath) {
          const deleteResponse = await this.postsService.deleteFile(filePath, 'profile'); 
          console.log('Delete response:', deleteResponse);
      }
  }
  
    try {
      const response = await this.postsService.uploadFile(this.selectedFile, this.user().userName, fileName, 'profile');
      this.uploadedUrl = response;
      this.userService.saveProfile(this.uploadedUrl, this.user().userName);
      Swal.close();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido';
      Swal.fire('Error', errorMessage, 'error');
    }


  }
  

  

}

