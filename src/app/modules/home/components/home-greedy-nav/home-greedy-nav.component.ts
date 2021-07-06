import {AfterViewInit, Component, ElementRef, NgZone, Renderer2} from '@angular/core';

import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";

@Component({
  selector: 'app-home-greedy-nav',
  templateUrl: './home-greedy-nav.component.html',
  styleUrls: ['./home-greedy-nav.component.scss']
})
export class HomeGreedyNavComponent implements AfterViewInit {

  constructor(
    private checkPlatformService: CheckPlatformService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      // greedy nav
      const nav = this.elementRef.nativeElement.ownerDocument.querySelector('nav.greedy');
      const btn = this.elementRef.nativeElement.ownerDocument.querySelector('nav.greedy button');
      const vLinks = this.elementRef.nativeElement.ownerDocument.querySelector('nav.greedy .links');
      const hLinks = this.elementRef.nativeElement.ownerDocument.querySelector('nav.greedy .hidden-links');

      let numOfItems = 0;
      let totalSpace = 0;
      const breakWidths: any[] = [];

      // Get initial state
      Object.entries(vLinks.children).forEach(([index, el]: any, i) => {
        totalSpace += el.clientWidth;
        numOfItems += 1;
        breakWidths.push(totalSpace);
      });

      let availableSpace;
      let numOfVisibleItems;
      let requiredSpace;
      const check = (): void => {
        availableSpace = vLinks.clientWidth - 10;
        numOfVisibleItems = vLinks.children.length;
        requiredSpace = breakWidths[numOfVisibleItems - 1];

        // There is not enough space
        if (requiredSpace > availableSpace) {
          this.renderer.appendChild(hLinks, vLinks.children[vLinks.children.length - 1]);
          numOfVisibleItems -= 1;
          check();
          // There is more than enough space
        } else if (availableSpace > breakWidths[numOfVisibleItems]) {
          this.renderer.appendChild(vLinks, hLinks.children[0]);
          numOfVisibleItems += 1;
        }
        // Update the button accordingly
        this.renderer.setAttribute(btn, 'count', String(numOfItems - numOfVisibleItems));
        if (numOfVisibleItems === numOfItems) {
          this.renderer.addClass(btn, 'hidden');
        } else {
          this.renderer.removeClass(btn, 'hidden');
        }
      };
      window.addEventListener('resize', () => {
        this.ngZone.run(() => {
          check();
        });
      });
      this.renderer.listen(btn, 'click', () => {
        hLinks.classList.toggle('hidden');
      });
      check();
    }
  }

}
