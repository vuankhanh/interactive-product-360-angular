import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image360Component } from '../image-360/image-360.component';
import { PresentService } from '../../../shared/service/api/present/present.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../shared/module/material';
import { TProductModel } from '../../../shared/interface/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    Image360Component,
    MaterialModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product?: TProductModel;
  images: string[] = [];
  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private routerActivated: ActivatedRoute,
    private presentService: PresentService,
  ) { }

  ngOnInit(): void {
    const route: string = this.routerActivated.snapshot.paramMap.get('route') as string;
    this.loadProductDetail(route);
  }
  
  private loadProductDetail(route: string): void {
    this.subscription.add(
      this.presentService.getDetail(route).subscribe((product) => {
        this.product = product;
        const images = product.albumDetail.media.map((media) => media.url);
        this.images = images;
      })
    );
  }

  back(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
