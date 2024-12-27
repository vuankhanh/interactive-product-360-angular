import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../shared/service/api/admin/product.service';
import { TProductModel } from '../../../shared/interface/product.interface';
import { IPagination } from '../../../shared/interface/pagination.interface';
import { paginationConstant } from '../../../constant/pagination.constant';
import { MatCommonModule } from '@angular/material/core';
import { MaterialModule } from '../../../shared/module/material';
import { SetBaseUrlPipe } from '../../../shared/pipe/set-base-url.pipe';
import { Router } from '@angular/router';
import { BreakpointDetectionService } from '../../../shared/service/breakpoint-detection.service';
import { CurrencyCustomPipe } from '../../../shared/pipe/currency-custom.pipe';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatCommonModule,

    SetBaseUrlPipe,
    CurrencyCustomPipe,

    MaterialModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  products?: TProductModel[];
  pagination: IPagination = paginationConstant;
  
  breakpointDetection$ = this.breakpointDetectionService.detection$();
  displayedColumns: string[] = ['thumbnail', 'name', 'price', 'availability', 'unit', 'action'];
  
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private productService: ProductService,
    private breakpointDetectionService: BreakpointDetectionService,
  ) {
  }

  ngOnInit() {
    this.initProduct('', this.pagination.page, this.pagination.size);
  }

  private initProduct(productName: string, page: number, size: number) {
    this.subscription.add(
      this.productService.getAll(productName, page, size).subscribe((res) => {
        this.products = res.data;
        this.pagination = res.paging;
      })
    );
  }

  handlePageEvent(event: PageEvent) {
    this.initProduct('', event.pageIndex, event.pageSize);
  }


  onCreateEvent() {
    this.router.navigate(['/admin/product-edit']);
  }

  onViewEvent(element: TProductModel) {
    this.router.navigate(['/admin/product', element._id]);
  }

  onOrderEvent(element: TProductModel) {
    this.router.navigate(['/admin/order-edit'], {
      queryParams: { productId: element._id }
    })
  }

  onEditEvent(element: TProductModel) {
    this.router.navigate(['/admin/product-edit'], {
      queryParams: {
        _id: element._id
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
