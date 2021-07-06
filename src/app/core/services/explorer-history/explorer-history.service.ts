import {Injectable} from '@angular/core';

import {Location} from '@angular/common';
import {CheckPlatformService} from "../check-platform/check-platform.service";

@Injectable({
  providedIn: 'root'
})
export class ExplorerHistoryService {

  constructor(
    private location: Location,
    private checkPlatformService: CheckPlatformService
  ) {
  }

  goBack(): void {
    if (this.checkPlatformService.isBrowser) {
      this.location.back();
    }
  }
}
