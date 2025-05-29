import { Component }                     from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { FormsModule }                   from '@angular/forms';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AuthService }                   from '../services/auth/auth.service';
import { DialogService }                 from '../services/dialog/dialog.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,                     
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, MatDialogModule, RouterModule]
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';
  rememberMe: any;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private dialogService: DialogService
  ) {}

  async login(): Promise<void> {
    const result = await this.authService.login(this.email, this.password);
    if (result.success) {
      this.dialogRef.close();
    } else {
      this.errorMessage = result.message;
    }
  }

  loginWithGoogle(): void {
    alert('Login con Google no implementado aún.');
  }

  openRegister(): void {
    this.dialogRef.close();
    this.dialogService.openRegister();
  }

  closeForm(): void {
    this.dialogRef.close();
  }
}
