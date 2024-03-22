import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { Router } from '@angular/router'; // Agrega esta importación

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = '';
  nombre: string = '';
  contrasena: string='';
  dataRecibida: string='';

  usuario: string = '';
  contrasenia: string = '';

  formularioValido: boolean = false;
mensajeErrorNombre: string = '';
mensajeErrorContrasena: string='';

constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService, private router: Router) {}

iniciarSesion() {
  this.loginService.iniciarSesion(this.usuario, this.contrasenia);
  if (this.loginService.logueado) {
    this.router.navigate(['/login']); // Redirigir al usuario a la ruta "/login" después de iniciar sesión correctamente
  }
}

validarNombre(): boolean {
  const maxNombreLength = 20;
  this.mensajeErrorNombre = '';
  if (this.nombre.length > maxNombreLength) {
    this.mensajeErrorNombre = `El nombre debe contener un máximo de ${maxNombreLength} caracteres.`;
    return false;
  }
  if (!/^[A-ZÁÉÍÓÚÑ]/.test(this.nombre)) {
    this.mensajeErrorNombre = 'La primera letra debe ser mayúscula.';
    return false;
  }
  if (/\s/.test(this.nombre)) {
    this.mensajeErrorNombre = 'No debe contener espacios.';
    return false;
  }
  if (/[^a-zA-ZáéíóúÁÉÍÓÚÑñ\s]/.test(this.nombre)) {
    this.mensajeErrorNombre = 'No debe contener caracteres no validos.';
    return false;
  }
  if (this.nombre.length < 3) {
    this.mensajeErrorNombre = 'El nombre debe contener al menos 3 letras.';
    return false;
  }
  if (/(.)\1{2}/.test(this.nombre)) {
    this.mensajeErrorNombre = 'Pon un nombre válido (sin 3 letras consecutivas iguales).';
    return false;
  }
  if (this.nombre.slice(1).match(/[A-ZÁÉÍÓÚÑ]/)) {
    this.mensajeErrorNombre = 'Solo puede haber una letra mayúscula al inicio.';
    return false;
  }
  
  return true;
}

mensajeErrorCorreo: string = '';

validarCorreo(): boolean {
  this.mensajeErrorCorreo = '';
  const maxNombreLength = 20;


  if (/[A-Z]/.test(this.email)) {
    this.mensajeErrorCorreo = 'Solo se aceptan letras minúsculas en el correo.';
    return false;
  }

  if (/(.)\1{2}/.test(this.email)) {
    this.mensajeErrorCorreo = 'Pon un correo válido (sin 3 letras consecutivas iguales).';
    return false;
  }

  let parts = this.email.split('@')[0].split('.');
  if (parts.length === 2) {
    if (parts[0].length < 3 || parts[0].length > maxNombreLength) {
      this.mensajeErrorCorreo = `El nombre del docente debe contener entre 3 y ${maxNombreLength} letras.`;
      return false;
    }
    if (parts[1].length < 3 || parts[1].length > maxNombreLength) {
      this.mensajeErrorCorreo = `El apellido del docente debe contener entre 3 y ${maxNombreLength} letras.`;
      return false;
    }
    if (parts[0] === parts[1]) {
      this.mensajeErrorCorreo = 'El nombre y el apellido del docente no pueden ser iguales.';
      return false;
    }
  }

  
  const alumnoPattern = /^(202[0-9])\d{1}[a-z]\d{6}@utcv\.edu\.mx$/;
  const maestroPattern = /^[a-z]{3,20}\.[a-z]{3,20}@utcv\.edu\.mx$/;

  if (!alumnoPattern.test(this.email) && !maestroPattern.test(this.email)) {
    this.mensajeErrorCorreo = 'Coloca un correo de alumno o maestro correctos.';
    return false;
  }

  return true; 
}



validarContrasena(): boolean {
  this.mensajeErrorContrasena = '';

  if (this.contrasena.length < 8) {
    this.mensajeErrorContrasena = 'La contraseña debe contener al menos 8 caracteres.';
    return false;
  }
  if (!/\d/.test(this.contrasena)) {
    this.mensajeErrorContrasena = 'Utilizar mínimo 1 número.';
    return false;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.contrasena)) {
    this.mensajeErrorContrasena = 'Utilizar mínimo 1 caracter especial.';
    return false;
  }
  if (!/[A-Z]/.test(this.contrasena) || !/[a-z]/.test(this.contrasena)) {
    this.mensajeErrorContrasena = 'Utilizar mayúsculas y minúsculas.';
    return false;
  }
  
  
  return true; 
}


validarFormulario(): void {
  const esNombreValido = this.validarNombre();
  const esCorreoValido = this.validarCorreo();
  const esContrasenaValida = this.validarContrasena();
  this.formularioValido = esNombreValido && esCorreoValido && esContrasenaValida;

  console.log('Formulario válido:', this.formularioValido);
}



  

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.dataRecibida = params['data'];
    });
  }
 
}
