import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CheckPlatformService {
  isBrowser: boolean = isPlatformBrowser(this.platformId);
  isServer: boolean = isPlatformServer(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
  }
}
