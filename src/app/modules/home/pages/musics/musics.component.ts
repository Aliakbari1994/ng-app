import {AfterViewChecked, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss']
})
export class MusicsComponent implements OnInit, AfterViewChecked, OnDestroy {

  sectionLoading$ = this.homeFacade.sectionLoading$.pipe(takeWhile(() => this.componentActive));
  buttonLoading$: Observable<boolean> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  musics$ = this.homeFacade.musics$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  genres: any;
  componentActive = true;
  filter: string = '';
  type: string = '';
  genre: string = '';
  currentPage = 1;

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private carouselService: CarouselService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.homeFacade.dispatchGenres();
    this.homeFacade.dispatchMusics(this.type, this.genre, this.filter, 1);
    this.zone.runOutsideAngular(() => {
      this.route.queryParams.subscribe(params => {
        this.type = params['type'] ? params['type'] : '';
        this.genre = params['genre'] ? params['genre'] : '';
        this.filter = params['filter'] ? params['filter'] : '';
        this.homeFacade.dispatchRefreshMusics(this.type, this.genre, this.filter, 1);
      });
      this.homeFacade.genres$.pipe(takeWhile(() => this.componentActive)).subscribe(
        res => this.genres = res,
      );
    });
    const seoData: SeoSocialShareData = {
      title: `آرشیو موسیقی | اسکنت مدیا`,
      keywords: `موسیقی ایران، موسیقی جهان، دانلود آهنگ ، دانلود موزیک، آهنگ جدید ، music, persian music ، موزیک خارجی، آهنگ خارجی`,
      description: `در این بخش به آرشیو موسیقی ایران و جهان در وبسایت اسکنت مدیا دسترسی خواهید داشت.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public genreTrackByFunc(index: number, el: any): number {
    return el.slug;
  }

  public changeMusicFilter(event: Event) {
    this.router.navigate(
      ['/musics'],
      {
        relativeTo: this.route,
        queryParams: {filter: (event.target as HTMLSelectElement).value},
        queryParamsHandling: 'merge'
      }).then();
  }

  public changeMusicType(event: Event) {
    this.router.navigate(
      ['/musics'],
      {
        relativeTo: this.route,
        queryParams: {type: (event.target as HTMLSelectElement).value},
        queryParamsHandling: 'merge'
      }).then();
  }

  public changeMusicGenre(event: Event) {
    this.router.navigate(
      ['/musics'],
      {
        relativeTo: this.route,
        queryParams: {genre: (event.target as HTMLSelectElement).value},
        queryParamsHandling: 'merge'
      }).then();
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

  public playAlbum(slugId: string): void {
    this.homeFacade.dispatchPlayAlbum(slugId);
  }

  public setTrackSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public setAlbumSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistAlbumSlug(slugId);
  }

  public addToNowPlayingTrack(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public addToNowPlayingAlbum(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingAlbum(slugId);
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public loadMore(): void {
    this.homeFacade.dispatchLoadMoreMusics(this.type, this.genre, this.filter, this.currentPage + 1)
  }
}
