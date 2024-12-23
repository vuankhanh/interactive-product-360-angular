import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class RegistryMatIconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "arrow-curve-up-left",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/arrow-curve-up-left.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "arrow-curve-up-right",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/arrow-curve-up-right.svg")
    );
  }
}
