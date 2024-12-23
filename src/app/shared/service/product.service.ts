import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IProduct } from '../interface/product.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private imagesUrl = `${environment.frontend}/assets/images`;
  private images: any[] = [
    {
      code: 'A101',
      urls: [
        `${this.imagesUrl}/A101/IMG_20241218_162003.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162013.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162019.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162024.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162030.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162036.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162042.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162050.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162056.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162103.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162109.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162115.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162122.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162128.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162134.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162140.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162146.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162152.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162158.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162204.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162210.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162216.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162223.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162230.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162237.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162248.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162255.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162302.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162308.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162321.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162327.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162334.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162340.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162347.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162354.jpg`,
        `${this.imagesUrl}/A101/IMG_20241218_162401.jpg`
      ]
    }
  ];
  constructor() { }

  get(){

  }

  getByCode(code: string){
    return of(this.images.filter(image => image.code === code)[0]);
  }
}
