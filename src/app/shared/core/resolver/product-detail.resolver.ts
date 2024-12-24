import { ResolveFn } from '@angular/router';
import { TProductModel } from '../../interface/product.interface';
import { inject } from '@angular/core';
import { PresentService } from '../../service/api/present/present.service';

export const productDetailResolver: ResolveFn<TProductModel> = (route, state) => {
  return inject(PresentService).getDetail(route.paramMap.get('route') as string);
};
