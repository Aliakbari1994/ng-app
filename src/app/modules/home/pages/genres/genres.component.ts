import {
  AfterViewChecked,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {takeWhile} from "rxjs/operators";

import {HomeFacade} from "../../store/home.facade";
import {ColorThiefService} from "../../../../core/services/color-thief/color-thief.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChildren('genrePosts', {read: ElementRef}) genrePosts: QueryList<ElementRef> | undefined;
  componentActive = true;
  genres: any;

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private colorThiefService: ColorThiefService,
    private renderer: Renderer2,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.homeFacade.dispatchGenres();
    this.zone.runOutsideAngular(() => {
      this.homeFacade.genres$.pipe(takeWhile(() => this.componentActive)).subscribe(
        res => this.genres = res,
      );
    });
    const seoData: SeoSocialShareData = {
      title: `سبک های موسیقی | اسکنت مدیا`,
      keywords: `ژانر، سبک، genre, سلیقه موسیقی`,
      description: `در این بخش میتوانید موسیقی های مناسب با ژانر و سبک مورد علاقه خود را پیدا کنید.`,
    };
    this.seoSocialShareService.setData(seoData);
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
