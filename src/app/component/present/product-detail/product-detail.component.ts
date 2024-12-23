import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image360Component } from '../image-360/image-360.component';
import { PresentService } from '../../../shared/service/api/present/present.service';
import { ActivatedRoute } from '@angular/router';

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
    private routerActivated: ActivatedRoute,
    private presentService: PresentService,
  ) { }

  ngOnInit(): void {
    const route: string = this.routerActivated.snapshot.paramMap.get('route') as string;
    console.log(route);
    
    this.subscription.add(
      this.presentService.getDetail(route).subscribe((product) => {
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
