import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../services/auth/auth.service';
import { SupabaseService } from '../services/supabase/supabase.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterViewInit {
  userProfile: any = {};
  purchaseHistory: any[] = [];
  totalPurchases = 0;
  currentPage = 1;
  pageSize = 5;

  comments: any[] = [];
  filteredComments: any[] = [];
  tabs = [
    { label: 'Todos', count: 0, active: true },
    { label: 'Positivos', count: 0, active: false },
    { label: 'Negativos', count: 0, active: false },
  ];

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(async (user: User | null) => {
      if (user && user.id) {
        this.loadPurchaseHistory(user.id, this.currentPage);
        this.comments = await this.supabaseService.getUserReviewsWithReplies(
          user.id
        );

        const positivos = this.comments.filter((c) => c.rating >= 3).length;
        const negativos = this.comments.filter((c) => c.rating < 3).length;
        const todos = this.comments.length;

        this.tabs = [
          { label: 'Todos', count: todos, active: true },
          { label: 'Positivos', count: positivos, active: false },
          { label: 'Negativos', count: negativos, active: false },
        ];

        this.filteredComments = this.comments;
      }
      if (user) {
        this.userProfile = {
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          rating: user.rating || 0,
          ratingStars: Math.round(user.rating || 0),
          totalReviews: user.totalReviews || 0,
          details: {
            fullName: user.name,
            companyName: user.companyName || '',
            email: user.email,
            phone: user.phone || '',
            address: user.address || '',
          },
        };
      }
    });
  }

  async loadPurchaseHistory(userId: number, page: number) {
    const result = await this.supabaseService.getPurchaseHistory(
      userId,
      page,
      this.pageSize
    );
    this.purchaseHistory = result.data.map((row) => ({
      id: row.id,
      vehicle: row.vehicle,
      date: row.purchase_date,
      amount: `$${Number(row.amount).toLocaleString()}`,
      status: row.status,
      statusClass: row.status.toLowerCase(),
    }));
    this.totalPurchases = result.total;
  }

  goToPage(page: number) {
    this.currentPage = page;
    const userId =
      this.userProfile?.id || this.authService.getCurrentUser()?.id;
    if (userId) {
      this.loadPurchaseHistory(userId, page);
    }
  }

  get pages(): number[] {
    return Array(Math.ceil(this.totalPurchases / this.pageSize))
      .fill(0)
      .map((_, i) => i + 1);
  }

  changeTab(index: number): void {
    this.tabs.forEach((tab, i) => (tab.active = i === index));
    if (index === 0) {
      this.filteredComments = this.comments;
    } else if (index === 1) {
      this.filteredComments = this.comments.filter((c) => c.rating >= 3);
    } else if (index === 2) {
      this.filteredComments = this.comments.filter((c) => c.rating < 3);
    }
  }

  loadMoreComments(): void {
    alert('Cargando más comentarios...');
  }

  ngAfterViewInit(): void {
    const editButtons = document.querySelectorAll('.btn');
    editButtons.forEach((button) => {
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

    const loadMoreButton = document.querySelector('.load-more');
    if (loadMoreButton) {
      loadMoreButton.addEventListener('click', () => {
        this.loadMoreComments();
      });
    }
  }

  updateTabCounts() {
    const positivos = this.comments.filter((c) => c.rating >= 4).length;
    const negativos = this.comments.filter((c) => c.rating <= 2).length;
    const todos = this.comments.length;

    this.tabs = [
      { label: 'Todos', count: todos, active: this.tabs[0]?.active || false },
      {
        label: 'Positivos',
        count: positivos,
        active: this.tabs[1]?.active || false,
      },
      {
        label: 'Negativos',
        count: negativos,
        active: this.tabs[2]?.active || false,
      },
    ];
  }

  get userStars(): boolean[] {
    const rating = Math.round(this.userProfile.rating || 0);
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }
}
