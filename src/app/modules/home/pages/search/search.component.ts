import {AfterViewChecked, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {takeWhile} from "rxjs/operators";
import {Observable} from "rxjs"

import {HomeFacade} from "../../store/home.facade";;
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {PersianNumberService} from "ngx-persian";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewChecked, OnDestroy {
  componentActive = true;
  buttonLoading$: Observable<boolean> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  result$ = this.homeFacade.search$.pipe(takeWhile(() => this.componentActive));
  query: string = '';
  filter: string = '';
  currentPage = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private homeFacade: HomeFacade,
    private carouselService: CarouselService,
    private persianNumberService: PersianNumberService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    const seoData: SeoSocialShareData = {
      title: `جستجو در اسکنت مدیا | اسکنت مدیا`,
      keywords: `دانلود آهنگ، دانلود موزیک، موسیقی، آهنگ ایرانی، آهنگ خارجی، اسکنت مدیا ، music, دانلود آهنگ جدید, skantmedia، skant media`,
      description: `در این بخش میتوانید آثار مورد نظر خود را با جستجو پیدا کنید.`,
    };
    this.seoSocialShareService.setData(seoData);
    this.homeFacade.dispatchSearch(this.query, this.filter, 1);
    this.zone.runOutsideAngular(() => {
      this.route.queryParams.subscribe(params => {
        this.query = params['q'] ?? '';
        this.filter = params['in'] ?? '';
        if (this.query) {
          this.homeFacade.dispatchSearch(this.query, this.filter, 1);
        }
      });
    });
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
    this.carouselService.setBackgroundGradient();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public changeSearchFilter(event: Event): void {
    this.router.navigate(
      ['/search'],
      {
        relativeTo: this.route,
        queryParams: {in: (event.target as HTMLSelectElement).value},
        queryParamsHandling: 'merge'
      }).then();
  }

  public changeSearchText(event: Event): void {
    this.router.navigate(
      ['/search'],
      {
        relativeTo: this.route,
        queryParams: {q: (event.target as HTMLInputElement).value},
        queryParamsHandling: 'merge'
      }).then();
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  };

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  };

  public playTrack(slugId: string): void {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public addToNowPlayingTrack(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public setTrackSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public playAlbum(slugId: string): void {
    this.homeFacade.dispatchPlayAlbum(slugId);
  }

  public setAlbumSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistAlbumSlug(slugId);
  }

  public addToNowPlayingAlbum(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingAlbum(slugId);
  }

  public playPlaylist(slugId: string) {
    this.homeFacade.dispatchPlayPlaylist(slugId);
  }

  public addToNowPlayingPlaylist(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingPlaylist(slugId);
  }

  public toPersian(text: any): string {
    return this.persianNumberService.toPersian(text);
  }

  public loadMore(): void {
    this.homeFacade.dispatchLoadMoreSearch(this.query, this.filter, this.currentPage + 1)
  }
}
