import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user:User = {
    userName: '',
    email:'',
    password: ''
  };

  loginForm = this.fb.group({
    userName:['bela'],
    password:['123']
  }

  );

  constructor(private fb:FormBuilder, private router:Router){

  }

  onLogin(){

    let userName = this.loginForm.value.userName;
    let password = this.loginForm.value.password;

    if (!userName || !password){
      alert('Debe diligenciar los campos');
      return;
    }
    const storedPassword = localStorage.getItem(userName.toLowerCase());

    if (storedPassword == null) {
      alert('Usuario no registrado')
    }else if (storedPassword == password) {
      alert('Exitoso');
      this.router.navigateByUrl("/home")
    } else {
      alert('Contraseña incorrecta');
    }


  
  }

}
