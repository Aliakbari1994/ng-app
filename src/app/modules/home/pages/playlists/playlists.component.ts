import {AfterViewChecked, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {ActivatedRoute} from "@angular/router";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, AfterViewChecked, OnDestroy {
  componentActive = true;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  buttonLoading$: Observable<boolean> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  playlists$ = this.homeFacade.playlists$.pipe(takeWhile(() => this.componentActive));
  slugId = this.route.snapshot.params['slug'];
  currentPage = 1;

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private carouselService: CarouselService,
    private route: ActivatedRoute,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.route.params.subscribe(params => {
        this.slugId = params['slug'];
        this.homeFacade.dispatchPlaylistsByCategory(this.slugId, 1);
      });
      this.homeFacade.pagination$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.currentPage = res.currentPage
      });
    });
    const seoData: SeoSocialShareData = {
      title: `پلی لیست ها | اسکنت مدیا`,
      keywords: `playlist, پلی لیست, لیست بخش, دسته بندی ها`,
      description: `در این بخش پلی لیست های اسکنت مدیا را بر اساس ذسته بندی  را مشاهده خواهید کرد.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public play(slugId: string) {
    this.homeFacade.dispatchPlayPlaylist(slugId);
  }

  public addToNowPlaying(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingPlaylist(slugId);
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public loadMore(): void {
    this.homeFacade.dispatchPlaylistsByCategoryLoadMore(this.slugId, this.currentPage + 1)
  }
}
