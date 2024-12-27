import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image360Component } from '../image-360/image-360.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../../shared/module/material';
import { TProductModel } from '../../../shared/interface/product.interface';
import { PlatformService } from '../../../shared/service/platform.service';
import { Meta } from '@angular/platform-browser';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { environment } from '../../../../environments/environment';

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
  frontendUrl = environment.frontend;
  product?: TProductModel;
  images: string[] = [];
  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platformService: PlatformService,
    private metaService: Meta,
    private setBaseUrlPipe: SetBaseUrlPipe
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.data.subscribe(({productDetail}) => {
        const isBrowser = this.platformService.isBrowserPlatform;
        
        this.product = productDetail;
        if(isBrowser){
          const images = this.product!.albumDetail.media.map((media) => media.url);
          this.images = images;

        }
        const productThumbnail = this.setBaseUrlPipe.transform(this.product!.albumDetail.thumbnail);
        this.metaService.addTags([
          { property: 'og:title', content: this.product!.name },
          { property: 'og:description', content: this.product!.description! },
          { property: 'og:image', content: productThumbnail },
          { property: 'og:url', content: this.frontendUrl+ '/' + this.product!.name},
          { property: 'og:type', content: 'product' }
        ]);
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
