import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../shared/service/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../shared/interface/product.interface';
import { Image360Component } from '../image-360/image-360.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [Image360Component],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  images: string[] = [];
  private subscription: Subscription = new Subscription();
  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.productService.getByCode('A101').subscribe((product) => {
        this.images = product.urls;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
