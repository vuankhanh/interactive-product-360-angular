import { Component } from '@angular/core';
import { SliderControlComponent } from '../slider-control/slider-control.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    SliderControlComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}
