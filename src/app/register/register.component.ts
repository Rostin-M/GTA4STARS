// src/app/register/register.component.ts
import { Component }        from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthService }      from '../services/auth/auth.service';
import { LoginComponent }   from '../login/login.component';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ]
})
export class RegisterComponent {
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private dialog: MatDialog
  ) {}

  async register(): Promise<void> {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    // Solo envía los campos requeridos por la tabla
    const result = await this.authService.register({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    });
    if (!result.success) {
      this.errorMessage = result.message;
      return;
    }
    alert(result.message);
    this.dialogRef.close();
    this.dialog.open(LoginComponent, { width: '400px' });
  }

  registerWithGoogle(): void {
    alert('¡Registrado con Google! (Futuro feature 🔥)');
  }

  openLogin(): void {
    this.dialogRef.close();
    this.dialog.open(LoginComponent, { width: '400px' });
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
