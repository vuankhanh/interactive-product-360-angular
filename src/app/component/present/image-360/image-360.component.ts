import { Component, inject, Input, OnInit } from '@angular/core';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { MaterialModule } from '../../../shared/module/material';

@Component({
  selector: 'app-image-360',
  standalone: true,
  imports: [
    MaterialModule,
    SetBaseUrlPipe
  ],
  templateUrl: './image-360.component.html',
  styleUrls: ['./image-360.component.scss']
})
export class Image360Component implements OnInit {
  @Input() images: string[] = [];
  currentImage?: string;
  currentIndex: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  zoomScale: string = 'scale(1)';
  

  private baseUrl = inject(SetBaseUrlPipe);

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

  rotateLeft(): void {
    this.currentIndex = (this.currentIndex + 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }

  rotateRight(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }

  toggleZoom() {
    this.zoomScale = this.zoomScale === 'scale(1)' ? 'scale(1.5)' : 'scale(1)';
  }
}
