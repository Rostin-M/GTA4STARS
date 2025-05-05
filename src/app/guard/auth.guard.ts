import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el enrutador

  const isAuthenticated = !!authService.getCurrentUser(); // Verifica si hay un usuario autenticado
  if (!isAuthenticated) {
    router.navigate(['/home']); // Redirige al usuario a la página de inicio si no está autenticado
    return false;
  }
  return true; // Permite el acceso si está autenticado
};