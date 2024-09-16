import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm = this.fb.group({
    userName:['', [Validators.required]],
    password:['', [Validators.required]]
  });


  userService = new UserService();

  constructor(private fb:FormBuilder, private router:Router){

  }

  onLogin(){

    if(!this.loginForm.valid){  
      Swal.fire({
        title: "Error",
        text: "Diligencia todos los campos",
        icon: "warning"
      });
      return;

    }

    let userName = this.loginForm.value.userName;
    let password = this.loginForm.value.password;


    const response = this.userService.login({userName:userName!, password:password!});

    if(response.success){
      this.router.navigateByUrl('/home')
    }else{
      Swal.fire({
        text: response.message,
        icon: "error"
      });
      return;
      
    }

  }

}
