import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { LoginResponse, SignUpResponde } from '../interfaces/login-response.interface';
import { UserDBService } from './user.db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private service:UserDBService){

  }

  currentUser = signal<User>({userName:'',password:'', email:''});

  login(userName: string, password: string) :LoginResponse{
    const userSrt = localStorage.getItem(userName.toLowerCase().trim());
    if(!userSrt){
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      }
    }
    const user:User = JSON.parse(userSrt);
    if (user.password !== password) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos'
      }
    }
    this.setUser(user);
    return {
      success: true
    }

  }

  
  register(user:User): SignUpResponde{
    if (localStorage.getItem(user.userName.toLowerCase().trim())) {
      return {
        success: false,
        message: 'Usuario ya existe'
      }
    }
    const userSrt = JSON.stringify(user);
    localStorage.setItem(user.userName.toLowerCase().trim(), userSrt);
    this.setUser(user);
    return {
      success: true
    }
  }

  private setUser(user:User){
    this.currentUser.set(user);
  }

  getUser(){
    return this.currentUser();
  }

}



