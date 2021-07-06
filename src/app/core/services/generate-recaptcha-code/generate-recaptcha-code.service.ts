import {Injectable, NgZone} from '@angular/core';

import {environment} from "../../../../environments/environment";
import {ReCaptchaV3Service} from "ngx-captcha";
import {CheckPlatformService} from "../check-platform/check-platform.service";
import {AuthFacade} from "../../../modules/auth/store/auth.facade";

@Injectable({
  providedIn: 'root'
})
export class GenerateRecaptchaCodeService {

  constructor(
    private zone: NgZone,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private checkPlatformService: CheckPlatformService,
    private authFacade: AuthFacade
  ) {
  }

  public generateRecaptcha(): void {
    this.zone.runOutsideAngular(() => {
      if (this.checkPlatformService.isBrowser) {
        // google recaptcha
        this.reCaptchaV3Service.execute(environment.recaptcha_site_key, 'authPage', (token) => {
          // send token to server
          this.authFacade.dispatchRecaptcha(token);
        }, {
          useGlobalDomain: false,
        });
      }
    });
  }
}
