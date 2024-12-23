import { Routes } from "@angular/router";
import { PresentComponent } from "./present.component";
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";

export const presentRoutes: Routes = [
  {
    path: '',
    component: PresentComponent,
    children: [
      {
        path: '',
        component: ProductComponent
      }, {
        path: ':id',
        component: ProductDetailComponent
      }
    ]
  }
]