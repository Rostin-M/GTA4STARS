import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../guards/auth-guard/auth.guard';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent, canActivate: [authGuard] }, // Ruta protegida por el guard
        { path: 'vehicles', component: VehiclesComponent },
        { path: 'purchase', component: PurchaseComponent },
        { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
      
        { path: '**', component: ErrorComponent },
      ];
