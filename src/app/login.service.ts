import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

//token!: string;
logueado: boolean = false;

  constructor() { }

iniciarSesion(usuario: string, contrasenia: string){
  //Lógica de negocio para consultar con las API
  // http.get(API)
  //Result: Credenciales con TOKEN

  if(usuario === 'admin' && contrasenia === 'admin'){
    //this.token = 'qwerty';
    this.logueado= true;
  }
  else{
    //this.token= '';
    this.logueado = false;
  }
  }


  cerrarSesion(){

    // Lógica de cerrar sesión (guardar trabajo,
    // sincronizar datos y borrar credenciales)

    //this.token='';
  }
}



