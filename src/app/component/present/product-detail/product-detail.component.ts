import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../shared/interface/product.interface';
import { Image360Component } from '../image-360/image-360.component';
import { PresentService } from '../../../shared/service/api/present/present.service';

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
    private presentService: PresentService,
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.presentService.getDetail('A101').subscribe((product) => {
        console.log(product);
        const images = product.albumDetail.media.map((media) => media.url);
        this.images = images;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
