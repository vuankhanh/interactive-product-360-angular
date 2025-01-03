import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../../service/api/admin/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(
    private router: Router,
    private authService: AuthService,
  ){

  }
  canActivate(): Observable<boolean> {
    
    return this.authService.checkToken().pipe(
      map(res=>true),
      catchError(err=>{
        this.router.navigate(['/admin/login'])
        return of(false)}
      )
    )
  }
}

export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  if(!isBrowser) return of(false);
  return inject(PermissionsService).canActivate()
};
