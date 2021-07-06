import {Injectable} from '@angular/core';

import {CheckPlatformService} from "../check-platform/check-platform.service";
import * as $ from "jquery";
import ClickEvent = JQuery.ClickEvent;
import {HomeFacade} from "../../../modules/home/store/home.facade";

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(
    private checkPlatformService: CheckPlatformService,
    private homeFacade: HomeFacade,
  ) {
  }

  public track(rateable: string, slugId: string) {
    if (this.checkPlatformService.isBrowser) {
      // enable tooltip
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
      // star ratings
      $('#rating-container i').each((index: number, el: HTMLElement) => {
        $(el).on('click', (e: ClickEvent) => {
          const value = $(el).data('value');
          $('#rating-container i').each((i: number, element: HTMLElement) => {
            if (value >= i + 1) {
              $(element).addClass('checked');
            }
            if (value < i + 1) {
              $(element).removeClass('checked');
            }
          });
          $('.your-rate').empty().append(` 10 / <b>${value}</b> `);
          // send value to server
          switch (rateable) {
            case 'track':
              this.homeFacade.dispatchRateTrack(slugId, +value);
              break;
            case 'album' :
              this.homeFacade.dispatchRateAlbum(slugId, +value)
              break;
          }
        });
      });
    }
  }
}
