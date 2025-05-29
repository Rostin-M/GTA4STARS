import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { SupabaseService } from '../services/supabase/supabase.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  users: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  @ViewChild('dropdownToggle', { static: false }) dropdownToggle!: ElementRef;
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;

  activeSection: string = 'dashboard';

  cars: any[] = [];
  sales: any[] = [];
  totalUsers: number = 0;
  totalCars: number = 0;
  totalSales: number = 0;
  totalIncome: number = 0;
  recentSales: any[] = [];

  async loadSales(): Promise<void> {
    const data = await this.supabaseService.getSales();
    this.sales = data || [];
  }

  async ngOnInit(): Promise<void> {
    this.initializeNavigation();
    this.initializeModals();
    await this.loadUsers();
    await this.loadCars();
    await this.loadSales();
    this.setDashboardKPIs();
    this.setRecentSales();
  }

  setDashboardKPIs(): void {
    this.totalUsers = this.users.length;
    this.totalCars = this.cars.reduce((sum, car) => sum + (car.stock || 0), 0);
    this.totalSales = this.sales.length;
    this.totalIncome = this.sales.reduce(
      (sum, sale) => sum + (sale.price || 0),
      0
    );
  }

  setRecentSales(): void {
    this.recentSales = this.sales.slice(0, 5).map((sale) => ({
      id: sale.code,
      client: sale.client?.name,
      vehicle: `${sale.vehicle?.brand} ${sale.vehicle?.model}`,
      price: sale.vehicle?.price
        ? `$${sale.vehicle.price.toLocaleString()}`
        : 'N/A',
      date: sale.sale_date,
      status: sale.status,
    }));
  }

  async loadUsers(): Promise<void> {
    const data = await this.supabaseService.getUsers();
    this.users = data || [];
  }

  async deleteUser(userId: number): Promise<void> {
    const confirmed = confirm('¿Seguro que deseas eliminar este usuario?');
    if (!confirmed) return;
    const { error } = await this.supabaseService.deleteUser(userId);
    if (!error) {
      this.users = this.users.filter((u) => u.id !== userId);
      alert('Usuario eliminado correctamente.');
    } else {
      alert('Error al eliminar el usuario.');
    }
  }

  async loadCars(): Promise<void> {
    const data = await this.supabaseService.getCars();
    this.cars = data || [];
  }

  async deleteCar(carId: number): Promise<void> {
    const confirmed = confirm('¿Seguro que deseas eliminar este vehículo?');
    if (!confirmed) return;
    const { error } = await this.supabaseService.deleteCar(carId);
    if (!error) {
      this.cars = this.cars.filter((c) => c.id !== carId);
      alert('Vehículo eliminado correctamente.');
    } else {
      alert('Error al eliminar el vehículo.');
    }
  }

  ngAfterViewInit(): void {
    this.initializeDropdown();
  }

  private initializeDropdown(): void {
    const dropdownToggle = this.dropdownToggle.nativeElement;
    const dropdownMenu = this.dropdownMenu.nativeElement;

    dropdownToggle.addEventListener('click', () => {
      dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (
        !target.matches('.dropdown-toggle') &&
        !target.closest('.dropdown-menu')
      ) {
        dropdownMenu.classList.remove('show');
      }
    });
  }

  private initializeNavigation(): void {
    const menuItems = document.querySelectorAll<HTMLElement>('.menu-item');
    const contentSections =
      document.querySelectorAll<HTMLElement>('.content-section');

    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        menuItems.forEach((mi) => mi.classList.remove('active'));
        contentSections.forEach((cs) => cs.classList.remove('active'));

        item.classList.add('active');
        document.getElementById(sectionId!)?.classList.add('active');
      });
    });
  }

  private initializeModals(): void {
    const modalTriggers: Record<string, string> = {
      'add-user-btn': 'add-user-modal',
      'add-car-btn': 'add-car-modal',
      'add-sale-btn': 'add-sale-modal',
    };

    Object.keys(modalTriggers).forEach((triggerId) => {
      const trigger = document.getElementById(triggerId);
      const modalId = modalTriggers[triggerId];

      if (trigger) {
        trigger.addEventListener('click', () => {
          document.getElementById(modalId)?.classList.add('show');
        });
      }
    });

    const deleteButtons = document.querySelectorAll<HTMLElement>('.delete-btn');
    deleteButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        document.getElementById('delete-modal')?.classList.add('show');
      });
    });

    const closeButtons = document.querySelectorAll<HTMLElement>(
      '.close-btn, .close-modal'
    );
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) {
          modal.classList.remove('show');
        }
      });
    });

    const modals = document.querySelectorAll<HTMLElement>('.modal');
    modals.forEach((modal) => {
      modal.addEventListener('click', (event: Event) => {
        if (event.target === modal) {
          modal.classList.remove('show');
        }
      });
    });
  }
}
