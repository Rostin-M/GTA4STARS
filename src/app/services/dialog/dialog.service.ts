import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'custom-dialog',
      disableClose: true
    });
  }

  openRegister(): void {
    this.dialog.open(RegisterComponent, {
      width: '400px',
      panelClass: 'custom-dialog',
      disableClose: true
    });
  }
}
