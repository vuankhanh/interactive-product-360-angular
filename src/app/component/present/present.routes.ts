import { Routes } from "@angular/router";
import { PresentComponent } from "./present.component";
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { productDetailResolver } from "../../shared/core/resolver/product-detail.resolver";

export const presentRoutes: Routes = [
  {
    path: '',
    component: PresentComponent,
    children: [
      {
        path: '',
        component: ProductComponent
      }, {
        path: ':route',
        component: ProductDetailComponent,
        resolve: { productDetail: productDetailResolver }
      }
    ]
  }
]