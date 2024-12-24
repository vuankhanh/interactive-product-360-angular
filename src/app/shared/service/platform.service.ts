import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private isBrowser: boolean;
  private isServer: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isServer = isPlatformServer(this.platformId);
  }

  get isBrowserPlatform(): boolean {
    return this.isBrowser;
  }

  get isServerPlatform(): boolean {
    return this.isServer;
  }
}
