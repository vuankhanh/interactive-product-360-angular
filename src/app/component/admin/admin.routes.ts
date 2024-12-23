import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AlbumComponent } from "./album/album.component";
import { AlbumDetailComponent } from "./album-detail/album-detail.component";
import { AlbumEditComponent } from "./album-edit/album-edit.component";
import { LoginComponent } from "./login/login.component";
import { permissionGuard } from "../../shared/core/guard/permission.guard";
import { ProductComponent } from "./product/product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'album',
        pathMatch: 'full'
      },
      {
        path: 'album',
        title: 'Album',
        component: AlbumComponent
      },
      {
        path: 'album/:route',
        title: 'Album',
        component: AlbumDetailComponent
      },
      {
        path: 'album-edit',
        component: AlbumEditComponent
      },
      {
        path: 'product',
        title: 'Sản phẩm',
        component: ProductComponent
      },
      {
        path: 'product/:id',
        title: 'Sản phẩm',
        component: ProductDetailComponent
      },
      {
        path: 'product-edit',
        component: ProductEditComponent
      },
    ],
    canActivate: [permissionGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  }
]