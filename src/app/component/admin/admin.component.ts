import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../shared/module/material';
import { BreakpointDetectionService } from '../../shared/service/breakpoint-detection.service';
import { AuthStateService } from '../../shared/service/auth_state.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    MaterialModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  breakpointDetection$: Observable<boolean> = of(false);
  menu = [
    { name: 'Album', route: 'album' },
    // { name: 'Khách hàng', route: 'customer' },
    { name: 'Sản phẩm', route: 'product' },
    // { name: 'Đơn hàng', route: 'order' }
  ]
  constructor(
    private breakpointDetectionService: BreakpointDetectionService,
    private authStateService: AuthStateService,
  ) {
    this.breakpointDetection$ = this.breakpointDetectionService.detection$()
  }

  logout() {
    this.authStateService.logout();
  }
}
