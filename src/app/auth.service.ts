import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  constructor() { }

  // Simula el proceso de autenticación
  authenticate(): void {
    this.authenticated = true;
    // Aquí podrías, por ejemplo, almacenar un token de autenticación en localStorage
    localStorage.setItem('userToken', 'token_simulado');
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    // Podrías también verificar la presencia de un token de autenticación en localStorage
    return this.authenticated || localStorage.getItem('userToken') !== null;
  }

  // Cierra la sesión del usuario
  logout(): void {
    this.authenticated = false;
    // Elimina el token de autenticación de localStorage
    localStorage.removeItem('userToken');
    // Realiza cualquier otra limpieza necesaria
  }
}
