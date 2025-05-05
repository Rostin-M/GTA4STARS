import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'users';
  private sessionKey = 'currentUser';

  // Subject para notificar cambios de usuario
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router) {}

  register(user: User): { success: boolean; message: string } {
    const users = this.getUsers();
    if (users.some(u => u.email === user.email)) {
      return { success: false, message: 'El correo ya está registrado.' };
    }
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return { success: true, message: 'Registro exitoso.' };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: 'Correo o contraseña incorrectos.' };
    }
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
    this.currentUserSubject.next(user);            // emito nuevo usuario
    return { success: true, message: 'Inicio de sesión exitoso.' };
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.currentUserSubject.next(null);            // emito cierre de sesión
    this.router.navigate(['/home']);            // redirijo a la página de inicio
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.sessionKey);
    return raw ? JSON.parse(raw) as User : null;
  }

  private getUsers(): User[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) as User[] : [];
  }
}
