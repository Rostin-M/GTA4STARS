import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase/supabase.service';
import { FormattedReview } from '../interfaces/supabase.interface';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewComponent implements OnInit {
  reviews: FormattedReview[] = [];
  loading = true;
  emptyMessage = '';
  errorMessage = '';

  currentIndex = 1;
  currentRating = 0;

  Math = Math;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    await this.loadReviews();
    this.updateCarousel();
  }

  async loadReviews(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      const reviews = await this.supabaseService.getReviews();
      this.reviews = reviews || [];

      if (this.reviews.length === 0) {
        this.emptyMessage =
          'Aún no se han publicado reseñas. ¡Sé el primero en opinar!';
      } else {
        this.emptyMessage = '';
      }
    } catch (error) {
      console.error('Error cargando reseñas:', error);
      this.errorMessage =
        'No pudimos cargar las reseñas. Por favor intenta más tarde.';
      this.reviews = [];
    } finally {
      this.loading = false;
    }
  }

  updateCarousel(): void {
    if (this.reviews.length === 0) return;

    const totalReviews = this.reviews.length;
    const prevIndex = (this.currentIndex - 1 + totalReviews) % totalReviews;
    const nextIndex = (this.currentIndex + 1) % totalReviews;

    document.querySelectorAll('.review-card').forEach((card) => {
      card.classList.remove('active', 'prev', 'next');
    });

    document.getElementById(`review-${prevIndex}`)?.classList.add('prev');
    document
      .getElementById(`review-${this.currentIndex}`)
      ?.classList.add('active');
    document.getElementById(`review-${nextIndex}`)?.classList.add('next');
  }

  navigateCarousel(direction: 'prev' | 'next'): void {
    if (this.reviews.length === 0) return;

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

  async handleFormSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const car = (document.getElementById('car') as HTMLInputElement).value;
    const comment = (document.getElementById('comment') as HTMLTextAreaElement)
      .value;

    if (name && car && comment && this.currentRating > 0) {
      try {
        alert(
          `¡Gracias por tu comentario, ${name}! Tu opinión sobre el ${car} ha sido registrada.`
        );
        (event.target as HTMLFormElement).reset();
        this.resetStars();
        await this.loadReviews();
      } catch (error) {
        console.error('Error enviando reseña:', error);
        alert(
          'Ocurrió un error al enviar tu reseña. Por favor intenta nuevamente.'
        );
      }
    } else {
      alert(
        'Por favor completa todos los campos y selecciona una calificación.'
      );
    }
  }

  private resetStars(): void {
    const starButtons = document.querySelectorAll('.star-btn');
    starButtons.forEach((btn) => {
      const star = btn.querySelector('i');
      star?.classList.replace('fas', 'far');
      btn.classList.remove('active');
    });
    this.currentRating = 0;
  }
}
