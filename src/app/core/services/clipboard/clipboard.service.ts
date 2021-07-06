import {Injectable} from '@angular/core';

import {CheckPlatformService} from "../check-platform/check-platform.service";

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(private checkPlatformService: CheckPlatformService) {
  }

  public copy(inputId: string): void {
    if (this.checkPlatformService.isBrowser) {
      const copyText = document.getElementById(inputId);
      (copyText as HTMLInputElement).select();
      (copyText as HTMLInputElement).setSelectionRange(0, 99999);
      document.execCommand("copy");
    }
  }
}
