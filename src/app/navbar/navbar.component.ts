// src/app/navbar/navbar.component.ts
import { Component, OnInit }     from '@angular/core';
import { DialogService }         from '../services/dialog/dialog.service';
import { AuthService, User }     from '../services/auth/auth.service';
import { Subscription }          from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  router: any;
performSearch() {
throw new Error('Method not implemented.');
}
onSearch($event: Event) {
throw new Error('Method not implemented.');
}

  currentUser: User | null = null;
  private sub!: Subscription;

  constructor(
    private dialogService: DialogService,
    private authService: AuthService
    //private router: Router
  ) {}

  ngOnInit() {
    // Me suscribo al observable de usuario
    this.sub = this.authService.currentUser$
      .subscribe(user => this.currentUser = user);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openLoginDialog(): void {
    this.dialogService.openLogin();
  }

  openRegisterDialog(): void {
    this.dialogService.openRegister();
  }

  logout(): void {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigate(['/profile']);

  }
}

