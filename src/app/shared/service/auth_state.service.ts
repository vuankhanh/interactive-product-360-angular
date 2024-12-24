import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  get isLogin(): boolean{
    const refreshToken = this.storageService.getItem('refreshToken');
    return refreshToken ? true : false;
  }
  logout(){
    this.storageService.removeItem('accessToken');
    this.storageService.removeItem('refreshToken');
    this.router.navigate(['/admin/login']);
  }
}
