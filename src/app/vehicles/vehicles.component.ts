import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {

vehicles = [
  {
    name: 'Truffade Adder',
    price: '$1,000,000',
    description: 'Inspirado en el Bugatti Veyron, este superdeportivo es uno de los más rápidos de Los Santos con una velocidad máxima impresionante.',
    features: { speed: '9.3/10', acceleration: '8.9/10', handling: '7.4/10' },
    image: 'assets/cars/adder.png'
  },
  {
    name: 'Pegassi Zentorno',
    price: '$725,000',
    description: 'Basado en el Lamborghini Sesto Elemento, este vehículo combina un diseño agresivo con un rendimiento excepcional en las calles.',
    features: { speed: '8.5/10', acceleration: '9.3/10', handling: '8.0/10' },
    image: 'assets/cars/zentorno.webp'
  },
  {
    name: 'Progen T20',
    price: '$2,200,000',
    description: 'Inspirado en el McLaren P1, este híbrido de alto rendimiento ofrece una combinación perfecta de velocidad y manejo preciso.',
    features: { speed: '9.5/10', acceleration: '9.4/10', handling: '9.2/10' },
    image: 'assets/cars/t20.webp'  },
  {
    name: 'Pegassi Osiris',
    price: '$1,950,000',
    description: 'Basado en el Pagani Huayra, este superdeportivo italiano combina arte y tecnología con un diseño aerodinámico único.',
    features: { speed: '8.9/10', acceleration: '9.0/10', handling: '8.7/10' },
    image: 'assets/cars/osiris.webp'  },
  {
    name: 'Grotti Turismo R',
    price: '$500,000',
    description: 'Inspirado en el Ferrari LaFerrari, este vehículo italiano de alto rendimiento ofrece una experiencia de conducción inigualable.',
    features: { speed: '9.1/10', acceleration: '8.8/10', handling: '8.5/10' },
    image: 'assets/cars/turismor.png'  },
  {
    name: 'Överflöd Entity XF',
    price: '$795,000',
    description: 'Basado en el Koenigsegg, este hipercoche sueco ofrece una combinación perfecta de velocidad extrema y diseño futurista.',
    features: { speed: '9.2/10', acceleration: '9.0/10', handling: '8.3/10' },
    image: 'assets/cars/entityxf.png'  }
];

}
