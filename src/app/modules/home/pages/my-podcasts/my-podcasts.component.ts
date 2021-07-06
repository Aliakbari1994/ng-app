import {AfterViewChecked, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PersianNumberService} from "ngx-persian";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-my-podcasts',
  templateUrl: './my-podcasts.component.html',
  styleUrls: ['./my-podcasts.component.scss']
})
export class MyPodcastsComponent implements OnInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  buttonLoading$: Observable<boolean> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  podcasts$ = this.homeFacade.podcasts$.pipe(takeWhile(() => this.componentActive));
  currentPage = 1;

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private carouselService: CarouselService,
    private route: ActivatedRoute,
    private router: Router,
    private persianNumberService: PersianNumberService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.homeFacade.dispatchMyPodcasts(1);
    this.zone.runOutsideAngular(() => {
      this.homeFacade.pagination$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.currentPage = res.currentPage
      });
    });
    const seoData: SeoSocialShareData = {
      title: `پادکست های دنبال شده | اسکنت مدیا`,
      keywords: `پادکست ها، برنامه رادیویی، Podcast`,
      description: `در این بخش پادکست های دنبال شده  را مشاهده خواهید کرد.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngAfterViewChecked(): void {
    this.carouselService.setBackgroundGradient();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public loadMore(): void {
    this.homeFacade.dispatchMyPodcastsLoadMore(this.currentPage + 1)
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public toPersian(text: any): string {
    return this.persianNumberService.toPersian(text);
  }

}
