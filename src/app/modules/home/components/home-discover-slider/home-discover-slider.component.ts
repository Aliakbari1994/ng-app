import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {Router} from "@angular/router";

import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import * as $ from "jquery";
import 'slick-carousel';
import {HomeFacade} from "../../store/home.facade";

@Component({
  selector: 'app-home-discover-slider',
  templateUrl: './home-discover-slider.component.html',
  styleUrls: ['./home-discover-slider.component.scss']
})
export class HomeDiscoverSliderComponent implements OnInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  slides$: Observable<any> = this.homeFacade.sliders$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private checkPlatformService: CheckPlatformService,
    private homeFacade: HomeFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if (this.checkPlatformService.isBrowser) {
      // @ts-ignore
      $('.main-slider').not('.slick-initialized').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        arrow: true,
      });
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  };
}
