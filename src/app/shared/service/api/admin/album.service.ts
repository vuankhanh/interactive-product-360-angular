import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { IAlbumDetailRespone, IAlbumResponse } from '../../../interface/album.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private url: string = environment.backendApi + '/admin/album'
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
    return this.httpClient.get<IAlbumResponse>(this.url, { params }).pipe(
      map(res => res.metaData)
    );
  }

  getDetail(detailParams: DetailParams) {
    let params = new HttpParams();
    for (const [k, v] of Object.entries(detailParams)) {
      params = params.append(k, v)
    }
    return this.httpClient.get<IAlbumDetailRespone>(this.url + '/detail', { params }).pipe(
      map(res => res.metaData)
    );
  }

  create(name: string, files: Array<Blob>) {
    let params = new HttpParams();
    params = params.append('name', name)
    const formData = new FormData();
    if (files.length) {
      for (let [index, file] of files.entries()) {
        formData.append('files', file);
      }
    }
    return this.httpClient.post<IAlbumDetailRespone>(this.url, formData, { params }).pipe(
      map(res => res.metaData)
    );
  }

  addNewFiles(id: string, files: Array<Blob>) {
    let params = new HttpParams();
    params = params.append('id', id);

    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }
    return this.httpClient.patch<IAlbumDetailRespone>(this.url + '/add-new-files', formData, { params }).pipe(
      map(res => res.metaData)
    );
  }

  removeFiles(id: string, filesWillRemove: Array<string>) {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.patch<IAlbumDetailRespone>(this.url + '/remove-files', { filesWillRemove }, { params }).pipe(
      map(res => res.metaData)
    );
  }

  itemIndexChange(id: string, newItemIndexChange: Array<string>) {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.patch<IAlbumDetailRespone>(this.url + '/item-index-change', { newItemIndexChange }, { params }).pipe(
      map(res => res.metaData)
    );
  }

  delete(id: string) {
    return this.httpClient.delete<IAlbumDetailRespone>(this.url+'/'+id);
  }
}

export interface DetailParams {
  id?: string,
  route?: string
}