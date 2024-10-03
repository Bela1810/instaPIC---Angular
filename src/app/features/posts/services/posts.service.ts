import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseConfig.url,
      environment.supabaseConfig.secret
    );
  }

  async uploadFile(file: File, userName: string, fileName: string){

    const { error } = await this.supabase.storage.from('my-pics').upload(`${userName}/${fileName}`, file);
    if(error){
      throw error;
    }

    const { data } = await this.supabase.storage.from('my-pics').getPublicUrl(`${userName}/${fileName}`)
    return data.publicUrl;
  }

  

}
  

  
  /**Funcion asincrona: funcion que se invoca y sigue derecho */


