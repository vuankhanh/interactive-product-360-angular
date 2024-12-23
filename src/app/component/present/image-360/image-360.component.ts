import { Component, ElementRef, HostListener, inject, Input, OnInit } from '@angular/core';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { MaterialModule } from '../../../shared/module/material';
import { PinchZoomModule } from '@meddv/ngx-pinch-zoom';

@Component({
  selector: 'app-image-360',
  standalone: true,
  imports: [
    MaterialModule,
    SetBaseUrlPipe,

    PinchZoomModule
  ],
  templateUrl: './image-360.component.html',
  styleUrls: ['./image-360.component.scss']
})
export class Image360Component implements OnInit {
  @Input() images: string[] = [];
  currentImage?: string;
  currentIndex: number = 0;
  private rotateInterval: any;

  private baseUrl = inject(SetBaseUrlPipe);
  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    if (this.images.length > 0) {
      this.preloadImages();
      this.currentImage = this.images[this.currentIndex];
    }
  }

  preloadImages(): void {
    this.images.forEach((image) => {
      const img = new Image();
      img.src = this.baseUrl.transform(image);
    });
  }

  private rotateLeft(): void {
    this.currentIndex = (this.currentIndex + 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }

  private rotateRight(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
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
