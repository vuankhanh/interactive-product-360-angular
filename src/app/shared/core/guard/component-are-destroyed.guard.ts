import { CanDeactivateFn, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export type CanDeactivateType = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export interface DeactivatableComponent {
  canDeactivate: () => CanDeactivateType;
}

export const componentAreDestroyedGuard: CanDeactivateFn<DeactivatableComponent> = (component: DeactivatableComponent) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};