import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { IProductDetailRespone, IProductResponse } from '../../../interface/product.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresentService {
  private url: string = environment.backendApi + '/present';
  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(name?: string, page?: number, size?: number) {
    let params = new HttpParams();
    if (name != undefined) {
      params = params.append('name', name)
    }
    if (page != undefined) {
      params = params.append('page', page)
    }
    if (size != undefined) {
      params = params.append('size', size)
    }
    return this.httpClient.get<IProductResponse>(this.url, { params }).pipe(
      map(res => res.metaData)
    );
  }

  getDetail(route: string) {
    let params = new HttpParams();
    params = params.append('route', route);
    return this.httpClient.get<IProductDetailRespone>(this.url + '/detail', { params }).pipe(
      map(res => res.metaData)
    );
  }
}
