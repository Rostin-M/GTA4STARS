import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorService } from '../services/error/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage: string = 'Algo salió mal';
  errorQuestion: string = '¿Has intentado apagarlo y encenderlo de nuevo?';

  constructor(private errorService: ErrorService) {
    this.errorService.errorMessage$.subscribe(
      (message) => this.errorMessage = message ?? 'Algo Salió mal'
    );
  }
}