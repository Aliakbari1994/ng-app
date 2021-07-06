import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {HomeFacade} from "../../store/home.facade";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import * as $ from "jquery";

@Component({
  selector: 'app-home-discover-categories',
  templateUrl: './home-discover-categories.component.html',
  styleUrls: ['./home-discover-categories.component.scss']
})
export class HomeDiscoverCategoriesComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  categories$ : Observable<any> = this.homeFacade.featuredCategories$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private carouselService: CarouselService,
    private checkPlatformService: CheckPlatformService,
    private homeFacade: HomeFacade,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.carouselService.setNavigationButton($('#slide-right-featured-categories'), $('#slide-left-featured-categories'));
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug;
  }

}
