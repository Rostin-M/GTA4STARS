import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from "../gallery/gallery.component";
import { ReviewComponent } from "../reviews/reviews.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, GalleryComponent, ReviewComponent, CommonModule, FormsModule, ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  email: string = '';

  servicios = [
    {
      icon: 'fa-car',
      titulo: 'Conocer Modelos',
      descripcion: 'Explora nuestra amplia gama de vehículos y encuentra el modelo perfecto para ti.',
      enlace: '#featured',
      textoBoton: 'Descubre Más'
    },
    {
      icon: 'fa-shopping-cart',
      titulo: 'Comprar Vehículos',
      descripcion: 'Adquiere tu próximo coche con facilidad y seguridad en nuestra plataforma.',
      enlace: '#contact',
      textoBoton: 'Compra Ahora'
    },
    {
      icon: 'fa-spray-can',
      titulo: 'Personalización y Modificaciones',
      descripcion: 'Transforma tu vehículo con mejoras de rendimiento y estéticas en nuestros talleres especializados.',
      enlace: '#contact',
      textoBoton: 'Personaliza Ahora'
    },
    {
      icon: 'fa-headset',
      titulo: 'Asistencia 24/7',
      descripcion: 'Nuestro equipo está disponible en todo momento para apoyarte en tus aventuras urbanas.',
      enlace: '#contact',
      textoBoton: 'Contacta con Nosotros'
    }
  ];

  iconos = [
    { icon: 'fa-city', title: '5+', text: 'Ciudades Disponibles' },
    { icon: 'fa-car-burst', title: '10,000+', text: 'Autos Vendidos' },
    { icon: 'fa-user-secret', title: '2000+', text: 'Clientes Satisfechos' },
    { icon: 'fa-gun', title: '99%', text: 'Protección Contra la Policía' }
  ];

  ngAfterViewInit() {
    // Asegurarse de que el video esté silenciado al iniciarse
    if (this.videoElement) {
      this.videoElement.nativeElement.muted = true;
    }
  }

  onSubmit() {
    // Por ahora solo mostramos el correo en consola
    console.log('Correo suscrito:', this.email);
    alert('¡Gracias por suscribirte!');
    this.email = '';
  }
}
