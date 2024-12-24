import { AfterViewInit, Component, ElementRef, HostListener, inject, Input, OnInit, ViewChild } from '@angular/core';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { MaterialModule } from '../../../shared/module/material';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';
import { LoaderService } from '../../../shared/service/loader.service';
import { SkeletonLoadingComponent } from '../../../shared/component/skeleton-loading/skeleton-loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-360',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,

    SkeletonLoadingComponent,

    PinchZoomModule
  ],
  templateUrl: './image-360.component.html',
  styleUrls: ['./image-360.component.scss']
})
export class Image360Component implements OnInit {
  @Input() images: string[] = [];
  imgElements: HTMLImageElement[] = [];
  currentImage?: string;
  currentIndex: number = 0;
  private rotateInterval: any;


  private baseUrl = inject(SetBaseUrlPipe);

  isSkeletonLoading: boolean = true;
  constructor() {
  }
  
  async ngOnInit() {
    if (this.images.length > 0) {
      try {
        const imgElements: HTMLImageElement[] = await Promise.all(this.preloadImages(this.images));
        this.imgElements = imgElements;
        this.currentImage = imgElements[this.currentIndex].src;
        this.isSkeletonLoading = false;
      }catch(e) {
        console.error('Error loading images', e);
        this.isSkeletonLoading = false;
      }
      
    }
  }

  private preloadImages(images: string[]): Promise<HTMLImageElement>[] {
    const a: Promise<HTMLImageElement>[] = images.map(image => {
      return this.preloadImage(image);
    });

    return a;
  }

  private preloadImage(image: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      img.style.width = 'auto';
      img.style.height = '100%';
      img.style.display = 'block';
      img.src = this.baseUrl.transform(image);
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => { reject() }; // Resolve even if there's an error to avoid blocking
    });
  }

  private rotateLeft(): void {
    this.currentIndex = (this.currentIndex + 1 + this.imgElements.length) % this.images.length;
    this.currentImage = this.imgElements[this.currentIndex].src;
  }

  private rotateRight(): void {
    this.currentIndex = (this.currentIndex - 1 + this.imgElements.length) % this.images.length;
    this.currentImage = this.imgElements[this.currentIndex].src;
  }

  startRotate(direction: 'left' | 'right'): void {
    if (direction === 'left') {
      this.rotateLeft();
    } else {
      this.rotateRight();
    }
    this.rotateInterval = setInterval(() => {
      if (direction === 'left') {
        this.rotateLeft();
      } else {
        this.rotateRight();
      }
    }, 100); // Adjust the interval as needed
  }

  stopRotate(event: MouseEvent | TouchEvent): void {
    if (this.rotateInterval) {
      event.preventDefault();
      clearInterval(this.rotateInterval);
      this.rotateInterval = null;
    }
  }
}
