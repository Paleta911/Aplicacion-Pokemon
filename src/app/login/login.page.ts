import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  contrasena: string='';
  dataRecibida: string='';
  formularioValido: boolean = false;
  mensajeErrorContrasena: string='';
  mensajeErrorCorreo: string = '';
  botonClicado: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {}


ngOnInit() {
  this.activatedRoute.queryParams.subscribe(params => {
    this.dataRecibida = params['data'];
  });
}

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
  const esCorreoValido = this.validarCorreo();
  const esContrasenaValida = this.validarContrasena();
  this.formularioValido = esCorreoValido && esContrasenaValida;

  console.log('Formulario válido:', this.formularioValido);
}

acceder(): void {
  if (this.formularioValido) {
    this.authService.authenticate(); // Marca al usuario como autenticado
    this.router.navigateByUrl('/tabs');
  }
}






  

}