import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse, SignUpResponde } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  login(user: User):LoginResponse{

    const storedPassword = localStorage.getItem(user.userName.toLowerCase());

    if (storedPassword !== user.password) {
      return{
        success:false,
        message: 'Usuario o contraseña incorrecta'
      }
    }
    return{
      success: true,
    }

  }

  register(user:User): SignUpResponde{

    if(localStorage.getItem(user.userName!.trim().toLowerCase())){
      return{
        success: false,
        message: 'Usuario ya Existe'
      }
    }
    
    /**userName!: la variable no es null ni undefined */
    localStorage.setItem(user.userName!.trim().toLowerCase(),user.password!);
    return{
      success: true
    }

  }
}
