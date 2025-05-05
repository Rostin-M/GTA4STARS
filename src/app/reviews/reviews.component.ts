import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewComponent implements OnInit {
  reviews = [
    {
      img: '../assets/image/img1.webp',
      alt: 'Cliente 1',
      message: '¡Compré el Zentorno y ahora soy el rey de las calles de Los Santos! Excelente servicio.',
      name: 'Michael De Santa',
      stars: 5,
      car: 'Pegassi Zentorno'
    },
    {
      img: '../assets/image/img2.webp',
      alt: 'Cliente 2',
      message: 'El Adder es una bestia. ¡Perfecto para escapar de la policía en mis misiones!',
      name: 'Franklin Clinton',
      stars: 4.5,
      car: 'Truffade Adder'
    },
    {
      img: '../assets/image/img3.webp',
      alt: 'Cliente 3',
      message: 'El Osiris no solo es rápido, también es elegante. ¡Ideal para mis negocios en Vinewood!',
      name: 'Trevor Philips',
      stars: 5,
      car: 'Pegassi Osiris'
    },
    {
      img: '../assets/image/img4.webp',
      alt: 'Cliente 4',
      message: 'El T20 es perfecto para las carreras clandestinas. ¡Gracias por el excelente servicio!',
      name: 'Lamar Davis',
      stars: 4.5,
      car: 'Progen T20'
    },
    {
      img: '../assets/image/img5.webp',
      alt: 'Cliente 5',
      message: 'El Itali GTO es mi favorito. ¡No hay mejor lugar para comprar autos en Los Santos!',
      name: 'Ron Jakowski',
      stars: 5,
      car: 'Grotti Itali GTO'
    },
    {
      img: '../assets/image/img6.webp',
      alt: 'Cliente 6',
      message: 'El Cheetah es increíblemente rápido. ¡Perfecto para mis escapadas en Blaine County!',
      name: 'Wade Hebert',
      stars: 4.5,
      car: 'Grotti Cheetah'
    }
  ];

  currentIndex = 1;
  currentRating = 0;

  Math = Math;

  ngOnInit(): void {
    this.updateCarousel();
  }

  updateCarousel(): void {
    const totalReviews = this.reviews.length;
    const prevIndex = (this.currentIndex - 1 + totalReviews) % totalReviews;
    const nextIndex = (this.currentIndex + 1) % totalReviews;

    document.querySelectorAll('.review-card').forEach(card => {
      card.classList.remove('active', 'prev', 'next');
    });

    document.getElementById(`review-${prevIndex}`)?.classList.add('prev');
    document.getElementById(`review-${this.currentIndex}`)?.classList.add('active');
    document.getElementById(`review-${nextIndex}`)?.classList.add('next');
  }

  navigateCarousel(direction: 'prev' | 'next'): void {
    const totalReviews = this.reviews.length;
    this.currentIndex =
      direction === 'prev'
        ? (this.currentIndex - 1 + totalReviews) % totalReviews
        : (this.currentIndex + 1) % totalReviews;
    this.updateCarousel();
  }

  handleStarClick(rating: number): void {
    this.currentRating = rating;

    const starButtons = document.querySelectorAll('.star-btn');
    starButtons.forEach((btn, index) => {
      const star = btn.querySelector('i');
      if (index < rating) {
        star?.classList.replace('far', 'fas');
        btn.classList.add('active');
      } else {
        star?.classList.replace('fas', 'far');
        btn.classList.remove('active');
      }
    });
  }

  handleFormSubmit(event: Event): void {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const car = (document.getElementById('car') as HTMLInputElement).value;
    const comment = (document.getElementById('comment') as HTMLTextAreaElement).value;

    if (name && car && comment && this.currentRating > 0) {
      alert(`¡Gracias por tu comentario, ${name}! Tu opinión sobre el ${car} ha sido registrada.`);
      (event.target as HTMLFormElement).reset();
      this.resetStars();
    } else {
      alert('Por favor completa todos los campos y selecciona una calificación.');
    }
  }

  private resetStars(): void {
    const starButtons = document.querySelectorAll('.star-btn');
    starButtons.forEach(btn => {
      const star = btn.querySelector('i');
      star?.classList.replace('fas', 'far');
      btn.classList.remove('active');
    });
    this.currentRating = 0;
  }
}