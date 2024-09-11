import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    email: [''],
    userName:['',],
    password:[''],
    confirmPassword: ['']
  });

  constructor(private fb: FormBuilder, private router: Router) {

  }

  onRegister() {
    let email = this.signUpForm.value.email;
    let userName = this.signUpForm.value.userName;
    let password = this.signUpForm.value.password;
    let confirmPassword = this.signUpForm.value.confirmPassword;
  
  
    if (!userName || !password || !email || !confirmPassword) {
      alert('Debe diligenciar todos los campos');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    if (localStorage.getItem(userName)) {
      alert('El usuario ya existe');
      return;
    }
  
    localStorage.setItem(userName, password);
    this.router.navigateByUrl('/home');
  }
  
  
  

}


