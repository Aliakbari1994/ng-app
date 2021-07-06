import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList, Renderer2,
  ViewChildren
} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {HomeFacade} from "../../store/home.facade";
import * as $ from "jquery";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {ColorThiefService} from "../../../../core/services/color-thief/color-thief.service";

@Component({
  selector: 'app-home-discover-genres',
  templateUrl: './home-discover-genres.component.html',
  styleUrls: ['./home-discover-genres.component.scss']
})
export class HomeDiscoverGenresComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  @ViewChildren('genrePosts', {read: ElementRef}) genrePosts: QueryList<ElementRef> | undefined;
  componentActive = true;
  genres$: Observable<any> = this.homeFacade.featuredGenres$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private carouselService: CarouselService,
    private homeFacade: HomeFacade,
    private checkPlatformService: CheckPlatformService,
    private colorThiefService: ColorThiefService,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.carouselService.setNavigationButton($('#slide-right-featured-genres'), $('#slide-left-featured-genres'));
    }
  }

  ngAfterViewChecked(): void {
    this.genrePosts?.forEach(item => {
      this.renderer.listen(item.nativeElement?.querySelector('img'), 'load', () => {
        const avgColor = this.colorThiefService.getAverageColor(item.nativeElement?.querySelector('img'));
        this.renderer.setStyle(item.nativeElement, 'background', avgColor);
      });
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug;
  }

}
