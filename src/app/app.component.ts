import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service'; // Ajusta esta ruta según la ubicación real de tu AuthService

// Import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// Register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Si el usuario intenta navegar fuera de /tabs, ejecutar logout
        if (!event.url.includes('/tabs')) {
          this.authService.logout();
        }
      }
    });
  }

  ngOnDestroy() {
    // Limpiar la suscripción para evitar fugas de memoria
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
