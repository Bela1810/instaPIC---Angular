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

  async uploadFile(file:File, fileName:string, folderName:string = 'base'){
    const { error } = await this.supabase.storage.from('my-pics').upload(`${folderName}/${fileName}`, file);
    if(error){
      console.log(error);
      return;
    }

    const { data } = await this.supabase.storage.from('instapic')
      .getPublicUrl(`${folderName}/${fileName}`)
    return data.publicUrl;
  }

}
  

  
  /**Funcion asincrona: funcion que se invoca y sigue derecho */


