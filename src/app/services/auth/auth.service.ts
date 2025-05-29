import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase/supabase.service';

export interface User {
  id?: number;
  code?: string;
  name: string;
  email: string;
  role?: string;
  registration_date?: string;
  status?: string;
  password?: string;
  avatar?: string;
  rating?: number;
  totalReviews?: number;
  companyName?: string;
  phone?: string;
  address?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router, private supabaseService: SupabaseService) {}

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  async register(user: { firstname: string; lastname: string; email: string; password: string; role?: string }): Promise<{ success: boolean; message: string }> {
    const name = `${user.firstname} ${user.lastname}`.trim();
    return await this.supabaseService.registerUser({
      name,
      email: user.email,
      password: user.password,
      role: user.role
    });
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    const result = await this.supabaseService.loginUser(email, password);
    if (result.success && result.user) {
      this.currentUserSubject.next(result.user);
    }
    return result;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }
}
