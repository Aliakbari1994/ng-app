import {Injectable} from '@angular/core';

import {CheckPlatformService} from "../check-platform/check-platform.service";
import {PersianNumberService} from "ngx-persian";

@Injectable({
  providedIn: 'root',
})
export class CountdownService {

  constructor(
    private checkPlatformService: CheckPlatformService,
    private persianNumberService: PersianNumberService
  ) {
  }

  public createCountDown(publishedTime: string, nowTime: string): any {
    if (this.checkPlatformService.isBrowser) {
      const countDownDate = new Date(publishedTime).getTime();
      let countDownNowTime = new Date(nowTime).getTime();
      let num = 1;
      const x = setInterval(() => {
        num++;
        let now = (1000 * num) + countDownNowTime++;
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        if (daysEl) {
          daysEl.innerHTML = this.persianNumberService.toPersian(String(days));
        }
        if (hoursEl) {
          hoursEl.innerHTML = this.persianNumberService.toPersian(String(hours));
        }
        if (minutesEl) {
          minutesEl.innerHTML = this.persianNumberService.toPersian(String(minutes));
        }
        if (secondsEl) {
          secondsEl.innerHTML = this.persianNumberService.toPersian(String(seconds));
        }
        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
    }
  }
}
