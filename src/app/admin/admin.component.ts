import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit, AfterViewInit {

  
  @ViewChild('dropdownToggle', { static: false }) dropdownToggle!: ElementRef;
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;

  activeSection: string = 'dashboard';

  users: { id: string; name: string; email: string; role: string; registrationDate: string; status: string }[] = [
    { id: '#USR-001', name: 'Michael De Santa', email: 'michael@losSantos.com', role: 'Cliente VIP', registrationDate: '10/01/2023', status: 'Activo' },
    { id: '#USR-002', name: 'Franklin Clinton', email: 'franklin@losSantos.com', role: 'Cliente', registrationDate: '15/01/2023', status: 'Activo' },
    { id: '#USR-003', name: 'Trevor Philips', email: 'trevor@losSantos.com', role: 'Cliente', registrationDate: '20/01/2023', status: 'Pendiente' },
    { id: '#USR-004', name: 'Lamar Davis', email: 'lamar@losSantos.com', role: 'Cliente', registrationDate: '25/01/2023', status: 'Activo' },
    { id: '#USR-005', name: 'Lester Crest', email: 'lester@losSantos.com', role: 'Cliente', registrationDate: '30/01/2023', status: 'Inactivo' },
    { id: '#USR-006', name: 'Amanda De Santa', email: 'amanda@losSantos.com', role: 'Cliente', registrationDate: '05/02/2023', status: 'Activo' },
    { id: '#USR-007', name: 'Jimmy De Santa', email: 'jimmy@losSantos.com', role: 'Cliente', registrationDate: '10/02/2023', status: 'Activo' }
  ];

  cars: { id: string; image: string; model: string; brand: string; price: string; stock: number; status: string }[] = [
      {
        id: '#CAR-001',
        image: 'assets/cars/zentorno.webp',
        model: 'Zentorno',
        brand: 'Pegassi',
        price: '$725,000',
        stock: 5,
        status: 'Disponible'
      },
      {
        id: '#CAR-002',
        image: 'assets/cars/turismor.png',
        model: 'Turismo R',
        brand: 'Grotti',
        price: '$500,000',
        stock: 3,
        status: 'Disponible'
      },
      {
        id: '#CAR-003',
        image: 'assets/cars/adder.png',
        model: 'Adder',
        brand: 'Truffade',
        price: '$1,000,000',
        stock: 2,
        status: 'Disponible'
      },
      // Agrega más vehículos según sea necesario
  ];

  sales: { id: string; client: string; vehicle: string; price: string; date: string; paymentMethod: string; status: string }[] = [
    {
      id: '#VNT-8452',
      client: 'Michael De Santa',
      vehicle: 'Pegassi Zentorno',
      price: '$725,000',
      date: '15/04/2023',
      paymentMethod: 'Transferencia',
      status: 'Completado'
    },
    {
      id: '#VNT-8451',
      client: 'Franklin Clinton',
      vehicle: 'Grotti Turismo R',
      price: '$500,000',
      date: '14/04/2023',
      paymentMethod: 'Efectivo',
      status: 'Completado'
    },
    {
      id: '#VNT-8450',
      client: 'Trevor Philips',
      vehicle: 'Vapid Sandking XL',
      price: '$45,000',
      date: '13/04/2023',
      paymentMethod: 'Efectivo',
      status: 'Pendiente'
    },
    {
      id: '#VNT-8449',
      client: 'Lamar Davis',
      vehicle: 'Albany Buccaneer',
      price: '$29,000',
      date: '12/04/2023',
      paymentMethod: 'Financiación',
      status: 'Completado'
    },
    {
      id: '#VNT-8448',
      client: 'Lester Crest',
      vehicle: 'Karin Dilettante',
      price: '$25,000',
      date: '11/04/2023',
      paymentMethod: 'Transferencia',
      status: 'Cancelado'
    },
    {
      id: '#VNT-8447',
      client: 'Amanda De Santa',
      vehicle: 'Obey 9F',
      price: '$120,000',
      date: '10/04/2023',
      paymentMethod: 'Tarjeta',
      status: 'Completado'
    },
    {
      id: '#VNT-8446',
      client: 'Jimmy De Santa',
      vehicle: 'BF Injection',
      price: '$16,000',
      date: '09/04/2023',
      paymentMethod: 'Financiación',
      status: 'Completado'
    }
  ];

  dashboardCards: { title: string; icon: string; value: string; description: string }[] = [
    {
      title: 'Total Usuarios',
      icon: 'fas fa-users',
      value: '1,254',
      description: '+12% desde el mes pasado'
    },
    {
      title: 'Vehículos en Stock',
      icon: 'fas fa-car',
      value: '87',
      description: '-5% desde el mes pasado'
    },
    {
      title: 'Ventas Totales',
      icon: 'fas fa-chart-line',
      value: '342',
      description: '+28% desde el mes pasado'
    },
    {
      title: 'Ingresos',
      icon: 'fas fa-dollar-sign',
      value: '$5.2M',
      description: '+18% desde el mes pasado'
    }
  ];

  recentSales: { id: string; client: string; vehicle: string; price: string; date: string; status: string }[] = [
    {
      id: '#VNT-8452',
      client: 'Michael De Santa',
      vehicle: 'Pegassi Zentorno',
      price: '$725,000',
      date: '15/04/2023',
      status: 'Completado'
    },
    {
      id: '#VNT-8451',
      client: 'Franklin Clinton',
      vehicle: 'Grotti Turismo R',
      price: '$500,000',
      date: '14/04/2023',
      status: 'Completado'
    },
    {
      id: '#VNT-8450',
      client: 'Trevor Philips',
      vehicle: 'Vapid Sandking XL',
      price: '$45,000',
      date: '13/04/2023',
      status: 'Pendiente'
    },
    {
      id: '#VNT-8449',
      client: 'Lamar Davis',
      vehicle: 'Albany Buccaneer',
      price: '$29,000',
      date: '12/04/2023',
      status: 'Completado'
    },
    {
      id: '#VNT-8448',
      client: 'Lester Crest',
      vehicle: 'Karin Dilettante',
      price: '$25,000',
      date: '11/04/2023',
      status: 'Cancelado'
    }
  ];


  ngOnInit(): void {
    this.initializeNavigation();
    this.initializeModals();
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
      if (!target.matches('.dropdown-toggle') && !target.closest('.dropdown-menu')) {
        dropdownMenu.classList.remove('show');
      }
    });
  }

  private initializeNavigation(): void {
    const menuItems = document.querySelectorAll<HTMLElement>('.menu-item');
    const contentSections = document.querySelectorAll<HTMLElement>('.content-section');

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

    const closeButtons = document.querySelectorAll<HTMLElement>('.close-btn, .close-modal');
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