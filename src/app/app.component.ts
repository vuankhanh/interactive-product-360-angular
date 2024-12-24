import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegistryMatIconService } from './shared/service/registry-mat-icon.service';
import { SpinnerComponent } from './shared/component/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    SpinnerComponent
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
