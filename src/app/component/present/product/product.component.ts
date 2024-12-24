import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { PresentService } from '../../../shared/service/api/present/present.service';
import { TProductModel } from '../../../shared/interface/product.interface';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { RouterLink } from '@angular/router';
import { SkeletonLoadingComponent } from '../../../shared/component/skeleton-loading/skeleton-loading.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    
    SetBaseUrlPipe
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  products: TProductModel[] = [];
  isLoaded: boolean = false;
  
  subscription: Subscription = new Subscription();
  constructor(
    private presentService: PresentService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.presentService.getAll().subscribe(res => {
        this.products = res.data
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
