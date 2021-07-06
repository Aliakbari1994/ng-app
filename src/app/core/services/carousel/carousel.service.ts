import { Injectable } from '@angular/core';

import {ColorThiefService} from "../color-thief/color-thief.service";
import {CheckPlatformService} from "../check-platform/check-platform.service";
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(
    private colorThiefService: ColorThiefService,
    private checkPlatformService: CheckPlatformService
  ) { }

  public setElementsColors(): void {
    if (this.checkPlatformService.isBrowser) {
      const elements = $('.carousel-element');
      elements.each((index, element) => {
        const buttons = $(element).find('.carousel-btn');
        const image: HTMLImageElement | null = element.querySelector('.carousel-thumbnail img');
        const overlayEl: HTMLElement | null = element.querySelector('.inner-overlay');
        image?.addEventListener('load', () => {
          const colors = this.colorThiefService.getPalette(image, 1, buttons.length);
          buttons.each((ind, el) => {
            $(el).css('background-color', colors[ind]);
          });
          const shadowColor = this.colorThiefService.getAverageColor(image, 1);
          if (overlayEl) {
            overlayEl.style.boxShadow = `0px 8px 12px -7px ${shadowColor}`;
          }
        });
      });
    }
  }

  public setBackgroundGradient(): void {
    if (this.checkPlatformService.isBrowser) {
      const elements = $('.podcast-element');
      elements.each((index, element) => {
        const image: HTMLImageElement | null = element.querySelector('.podcast-thumbnail img');
        image?.addEventListener('load', () => {
          const colors = this.colorThiefService.getPalette(image, 1, 2);
          $(element).css('background-image',
            `linear-gradient(180deg, ${colors[0]} 40%, ${colors[1]} 0%)`
          );
        });
      });
    }
  }

  public setNavigationButton(arrowRight: JQuery<HTMLElement>, arrowLeft: JQuery<HTMLElement>): void {
    if (this.checkPlatformService.isBrowser) {
      arrowRight.on('click', () => {
        arrowRight.parent().siblings().animate({scrollLeft: '+=230px'}, 900);
      });

      arrowLeft.on('click', () => {
        arrowLeft.parent().siblings().animate({scrollLeft: '-=230px'}, 900);
      });
    }
  }
}


