import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../services/supabase/supabase.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  cars: any[] = [];
  currentIndex = 0;
  showPopup = false;
  selectedCar: any = null;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.cars = await this.supabaseService.getCars();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.cars.length) % this.cars.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.cars.length;
  }

  getBoxClass(index: number): string {
    if (index === this.currentIndex) {
      return 'box active';
    } else if (
      index ===
      (this.currentIndex - 1 + this.cars.length) % this.cars.length
    ) {
      return 'box prev';
    } else if (index === (this.currentIndex + 1) % this.cars.length) {
      return 'box next';
    } else {
      return 'box hidden';
    }
  }

  openPopup(car: any) {
    this.selectedCar = car;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedCar = null;
  }
}
