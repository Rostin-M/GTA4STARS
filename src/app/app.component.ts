import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NavbarComponent }     from './navbar/navbar.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, MatIconModule, FormsModule, RouterModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GTA4STAR';
}



