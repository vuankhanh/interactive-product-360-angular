import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TProductModel } from '../../interface/product.interface';
import { IPagination } from '../../interface/pagination.interface';
import { PresentService } from '../../service/api/present/present.service';

export const productResolver: ResolveFn<{
  data: Array<TProductModel>;
  paging: IPagination;
}> = (route, state) => {
  return inject(PresentService).getAll(undefined, undefined, 500);
};
