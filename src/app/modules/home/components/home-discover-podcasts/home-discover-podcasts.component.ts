import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {Router} from "@angular/router";

import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {HomeFacade} from "../../store/home.facade";
import * as $ from "jquery";
import {PersianNumberService} from "ngx-persian";

@Component({
  selector: 'app-home-discover-podcasts',
  templateUrl: './home-discover-podcasts.component.html',
  styleUrls: ['./home-discover-podcasts.component.scss']
})
export class HomeDiscoverPodcastsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  podcasts$: Observable<any> = this.homeFacade.featuredPodcasts$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private carouselService: CarouselService,
    private checkPlatformService: CheckPlatformService,
    private homeFacade: HomeFacade,
    private router: Router,
    private persianNumberService: PersianNumberService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.carouselService.setNavigationButton($('#slide-right-featured-podcasts'), $('#slide-left-featured-podcasts'));
    }
  }

  ngAfterViewChecked(): void {
    this.carouselService.setBackgroundGradient();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public toPersian(text: any): string {
    return this.persianNumberService.toPersian(text);
  }

}
