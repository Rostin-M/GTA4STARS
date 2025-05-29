import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.vehicles = await this.supabaseService.getVehicles();
  }

  goToPurchase(vehicle: any) {
    localStorage.setItem('selectedVehicleId', vehicle.id);
    this.router.navigate(['/purchase'], { state: { vehicleId: vehicle.id } });
  }
}
