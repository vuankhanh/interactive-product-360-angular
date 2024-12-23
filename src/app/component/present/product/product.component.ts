import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { PresentService } from '../../../shared/service/api/present/present.service';
import { TProductModel } from '../../../shared/interface/product.interface';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,

    SetBaseUrlPipe
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  products: TProductModel[] = [];

  constructor(
    private presentService: PresentService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.presentService.getAll().subscribe(res => {
        console.log(res);
        
      this.products = res.data
    }));
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
