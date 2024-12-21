import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-360',
  standalone: true,
  templateUrl: './image-360.component.html',
  styleUrls: ['./image-360.component.scss']
})
export class Image360Component implements OnInit {
  @Input() images: string[] = [];
  currentImage?: string;
  currentIndex: number = 0;
  isDragging: boolean = false;
  startX: number = 0;

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.preloadImages();
      this.currentImage = this.images[this.currentIndex];
    }
  }

  preloadImages(): void {
    this.images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }

  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
    event.preventDefault(); // Prevent default behavior to avoid blocking
  }

  onDrag(event: MouseEvent): void {
    if (this.isDragging) {
      const deltaX = event.clientX - this.startX;
      if (Math.abs(deltaX) > 0) {
        this.startX = event.clientX;
        this.currentIndex = (this.currentIndex + (deltaX < 0 ? 1 : -1) + this.images.length) % this.images.length;
        this.currentImage = this.images[this.currentIndex];
      }
    }
  }

  endDrag(): void {
    this.isDragging = false;
  }

  startTouch(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
  }

  onTouch(event: TouchEvent): void {
    if (this.isDragging) {
      const deltaX = event.touches[0].clientX - this.startX;
      if (Math.abs(deltaX) > 0) {
        this.startX = event.touches[0].clientX;
        this.currentIndex = (this.currentIndex + (deltaX < 0 ? 1 : -1) + this.images.length) % this.images.length;
        this.currentImage = this.images[this.currentIndex];
      }
    }
  }

  endTouch(): void {
    this.isDragging = false;
  }

  onMouseLeave(): void {
    this.isDragging = false;
  }
}
