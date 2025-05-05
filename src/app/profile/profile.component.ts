import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit {
  // Información del usuario
  userProfile = {
    name: 'Carlos Rodríguez',
    role: 'Desarrollador',
    avatar: 'assets/general/profile-placeholder.png',
    rating: 4.2,
    ratingStars: 4, // Número de estrellas llenas
    totalReviews: 28,
    details: {
      fullName: 'Carlos Rodríguez Méndez',
      companyName: 'GTA4STARS',
      email: 'carlos.rodriguez@autoventas.com',
      phone: '+57 123 456 7890',
      address: 'Medellín, Colombia',
    }
  };

  // Historial de compras
  purchaseHistory = [
    { id: 1, vehicle: 'Pegassi Zentorno', date: '2023-10-01', amount: '$725,000', status: 'Completed', statusClass: 'completed' },
    { id: 2, vehicle: 'Dewbauchee Massacro', date: '2023-09-15', amount: '$275,000', status: 'Pending', statusClass: 'pending' },
    { id: 3, vehicle: 'Bravado Banshee 900R', date: '2023-08-20', amount: '$565,000', status: 'Cancelled', statusClass: 'cancelled' }
  ];

  // Comentarios y calificaciones
  comments = [
    {
      username: 'Yo',
      avatar: 'assets/general/profile-placeholder.png',
      date: '15/03/2025',
      content: 'Excelente servicio, el vendedor fue muy amable y me ayudó a encontrar el auto perfecto para mis necesidades. El proceso de compra fue rápido y sin complicaciones. ¡Muy recomendable!',
      rating: 5,
      actions: { useful: 3 },
      reply: null
    },
    {
      username: 'Yo',
      avatar: 'assets/general/profile-placeholder.png',
      date: '22/04/2025',
      content: 'El auto está en buenas condiciones, pero el proceso de entrega tardó más de lo prometido. El vendedor fue amable pero podría mejorar la comunicación sobre los tiempos de espera.',
      rating: 4,
      actions: { useful: 1 },
      reply: {
        username: 'Carlos Rodríguez',
        avatar: 'assets/general/profile-placeholder.png',
        badge: '(Vendedor)',
        date: '23/04/2025',
        content: 'Gracias por sus comentarios. Lamentamos la demora en la entrega. Estamos trabajando para mejorar nuestros procesos y asegurar que los tiempos de entrega sean más precisos en el futuro.'
      }
    }
  ];

  // Tabs para comentarios
  tabs = [
    { label: 'Todos', count: 28, active: true },
    { label: 'Positivos', count: 22, active: false },
    { label: 'Negativos', count: 6, active: false }
  ];

  // Función para cambiar de pestaña
  changeTab(index: number): void {
    this.tabs.forEach((tab, i) => (tab.active = i === index));
  }

  // Función para cargar más comentarios
  loadMoreComments(): void {
    alert('Cargando más comentarios...');
  }

  ngAfterViewInit(): void {
    // Funcionalidad para las pestañas de comentarios
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });

    // Funcionalidad para los botones de editar
    const editButtons = document.querySelectorAll('.btn');
    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const buttonText = button.textContent?.trim();
        if (buttonText === 'Editar') {
          alert('Función de edición activada');
        } else if (buttonText === 'Exportar') {
          alert('Función de exportación activada');
        } else if (buttonText === 'Filtrar') {
          alert('Función de filtrado activada');
        }
      });
    });

    // Funcionalidad para los botones de comentarios
    const commentButtons = document.querySelectorAll('.comment-button');
    commentButtons.forEach(button => {
      button.addEventListener('click', () => {
        const buttonText = button.textContent?.trim();
        alert(`Función de ${buttonText} activada`);
      });
    });

    // Funcionalidad para el botón de ver más comentarios
    const loadMoreButton = document.querySelector('.load-more');
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', () => {
        this.loadMoreComments();
      });
    }
  }
}