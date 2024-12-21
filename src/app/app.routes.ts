import { Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  }, {
    path: ':id',
    component: ProductDetailComponent
  }
];