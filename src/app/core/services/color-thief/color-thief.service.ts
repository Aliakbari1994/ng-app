import {Injectable} from '@angular/core';

import {CheckPlatformService} from "../check-platform/check-platform.service";
import ColorThief from 'colorthief';

@Injectable({
  providedIn: 'root'
})
export class ColorThiefService {

  constructor(private checkPlatformService: CheckPlatformService) {
  }

  rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');

  public getAverageColor(image: HTMLImageElement, alpha?: number): any {
    if (this.checkPlatformService.isBrowser) {
      const colorThief = new ColorThief();
      if (image.complete) {
        const color = colorThief.getColor(image);
        const r = color[0];
        const g = color[1];
        const b = color[2];
        if (alpha) {
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          return this.rgbToHex(r, g, b);
        }
      } else {
        image.addEventListener('load', () => {
          const color = colorThief.getColor(image);
          const r = color[0];
          const g = color[1];
          const b = color[2];
          if (alpha) {
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
          } else {
            return this.rgbToHex(r, g, b);
          }
        });
      }
    }
  }

  public getPalette(image: HTMLImageElement, alpha?: number, numberOfPalette: number = 2): any {
    if (this.checkPlatformService.isBrowser) {
      const colorThief = new ColorThief();
      if (image.complete) {
        const colors = colorThief.getPalette(image, numberOfPalette);
        const rgb: string[] = [];
        const hex: string[] = [];
        colors.forEach((item: any, index: number) => {
          const r = colors[index][0];
          const g = colors[index][1];
          const b = colors[index][2];
          if (alpha) {
            rgb.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
          } else {
            hex.push(this.rgbToHex(r, g, b));
          }
        });
        return (alpha) ? rgb : hex;
      } else {
        image.addEventListener('load', () => {
          const colors = colorThief.getPalette(image, numberOfPalette);
          const rgb: string[] = [];
          const hex: string[] = [];
          colors.forEach((item: any, index: number) => {
            const r = colors[index][0];
            const g = colors[index][1];
            const b = colors[index][2];
            if (alpha) {
              rgb.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
            } else {
              hex.push(this.rgbToHex(r, g, b));
            }
          });
          return (alpha) ? rgb : hex;
        });
      }
    }
  }
}
