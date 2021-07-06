import {AfterViewChecked, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-profile-playlists',
  templateUrl: './profile-playlists.component.html',
  styleUrls: ['./profile-playlists.component.scss']
})
export class ProfilePlaylistsComponent implements OnInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  username = this.route.snapshot.params['id'];
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  buttonLoading$: Observable<boolean> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  playlists$ = this.homeFacade.playlists$.pipe(takeWhile(() => this.componentActive));
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
        this.username = params['id'];
        this.homeFacade.dispatchProfileAllPublicPlaylists(this.username, 1);
        this.homeFacade.pagination$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
          this.currentPage = res.currentPage
        });
      });
    });
    const seoData: SeoSocialShareData = {
      title: `پلی لیست های کاربر | اسکنت مدیا`,
      keywords: `playlist, پلی لیست, لیست بخش, دسته بندی ها`,
      description: `در این بخش پلی لیست های کاربر را مشاهده خواهید کرد.`,
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
    this.homeFacade.dispatchProfileLoadMorePublicPlaylists(this.username, this.currentPage + 1)
  }
}
