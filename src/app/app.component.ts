import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegistryMatIconService } from './shared/service/registry-mat-icon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'interactive-product-360-angular';
  constructor(
    registryMatIconService: RegistryMatIconService
  ) {}
}
