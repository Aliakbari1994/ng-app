import {AfterViewChecked, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

import {ColorThiefService} from "../../../../core/services/color-thief/color-thief.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";

@Component({
  selector: 'app-home-shrink-header',
  templateUrl: './home-shrink-header.component.html',
  styleUrls: ['./home-shrink-header.component.scss']
})
export class HomeShrinkHeaderComponent implements AfterViewChecked{

  @ViewChild('headerThumbnail') headerThumbnail: ElementRef | undefined;
  @ViewChild('headerMain') headerMain: ElementRef | undefined;
  @ViewChild('headerLayer') headerLayer: ElementRef | undefined;
  @ViewChild('contentFlexible') contentFlexible: ElementRef | undefined;
  thumbnailSrc = '';
  bgColor = undefined;

  constructor(
    private checkPlatformService: CheckPlatformService,
    private colorThiefService: ColorThiefService,
    private renderer: Renderer2,
  ) {
  }

  ngAfterViewChecked(): void {
    this.thumbnailSrc = this.headerThumbnail?.nativeElement?.children[0]?.src;
    this.renderer.setStyle(this.headerMain?.nativeElement, 'background-image', `url('${this.thumbnailSrc}')`);
    this.renderer.listen(this.headerThumbnail?.nativeElement.children[0], 'load', () => {
      this.bgColor = this.colorThiefService.getAverageColor(this.headerThumbnail?.nativeElement.children[0], 0.85);
      this.renderer.setStyle(this.headerLayer?.nativeElement, 'background-color', this.bgColor);
    });
    if (this.checkPlatformService.isBrowser) {
      window.onscroll = () => {
        this.scrollFunction();
      };
    }
  }

  public scrollFunction(): void {
    if (this.checkPlatformService.isBrowser) {
      const headerEl = this.headerMain?.nativeElement;
      const headerHeight = headerEl.offsetHeight;
      const contentEl = this.contentFlexible?.nativeElement;
      const heightScroll = window.matchMedia('(max-width: 767.98px)').matches ? headerHeight : 0;
      if (document.body.scrollTop > heightScroll && document.body.scrollTop < headerHeight
        || document.documentElement.scrollTop > heightScroll && document.documentElement.scrollTop < headerHeight) {
        this.renderer.removeClass(headerEl, 'shrink-small');
        this.renderer.addClass(headerEl, 'shrink-header');
        this.renderer.addClass(headerEl, 'shrink-medium');
        this.renderer.addClass(contentEl, 'content-medium');
      } else if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
        this.renderer.removeClass(headerEl, 'shrink-medium');
        this.renderer.addClass(headerEl, 'shrink-header');
        this.renderer.addClass(headerEl, 'shrink-small');
        this.renderer.addClass(contentEl, 'content-medium');
      } else {
        this.renderer.removeClass(headerEl, 'shrink-header');
        this.renderer.removeClass(headerEl, 'shrink-medium');
        this.renderer.removeClass(headerEl, 'shrink-small');
        this.renderer.removeClass(contentEl, 'content-medium');
      }
    }
  }
}
