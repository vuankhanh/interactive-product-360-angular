import { Component } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'slider-control',
  standalone: true,
  imports: [
    MatSliderModule
  ],
  templateUrl: './slider-control.component.html',
  styleUrl: './slider-control.component.scss'
})
export class SliderControlComponent {
  onBlur(event: any): void {
    console.log(event);
  }
}
