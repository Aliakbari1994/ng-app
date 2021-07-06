import {AfterViewChecked, AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {takeWhile} from "rxjs/operators";
import {Observable} from "rxjs";

import {Artist} from "../../../../shared/models/artist/artist.model";
import {HomeFacade} from "../../store/home.facade";
import {ChangeNumberFormatService} from "../../../../core/services/change-number-format/change-number-format.service";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import * as $ from "jquery";
import {PersianNumberService} from "ngx-persian";
import {TimeChangeFormatService} from "../../../../core/services/time-change-format/time-change-format.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  buttonLoading$: Observable<boolean | null> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  sectionLoading$ = this.homeFacade.sectionLoading$.pipe(takeWhile(() => this.componentActive));
  tracks$: Observable<any[]> = this.homeFacade.tracks$.pipe(takeWhile(() => this.componentActive));
  albums$: Observable<any[]> = this.homeFacade.albums$.pipe(takeWhile(() => this.componentActive));
  popular$: Observable<any[]> = this.homeFacade.popular$.pipe(takeWhile(() => this.componentActive));
  url = this.checkPlatformService.isBrowser ? window.location.href : '';
  artist: Artist = {
    thumbnail: null,
    nameFa: '',
    nameEn: '',
    type: null,
    tracksCount: 0,
    followersCount: 0,
    plays: 0,
    downloads: 0,
    genres: [],
    slugId: null,
    keywords: null,
    description: null,
    followAction: null,
  };
  slugId = this.route.snapshot.params['id'];
  playerNowPlaying$ = this.homeFacade.playerNowPlaying$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private homeFacade: HomeFacade,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private carouselService: CarouselService,
    private checkPlatformService: CheckPlatformService,
    private changeNumberFormatService: ChangeNumberFormatService,
    private persianNumberService: PersianNumberService,
    private timeChangeFormatService: TimeChangeFormatService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.homeFacade.dispatchArtist(this.slugId);
    this.homeFacade.dispatchArtistTracks(this.slugId);
    this.homeFacade.dispatchArtistAlbums(this.slugId);
    this.homeFacade.dispatchArtistPopularPlaysTracks(this.slugId);
    this.zone.runOutsideAngular(() => {
      this.homeFacade.artist$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.artist = res;
        const seoData: SeoSocialShareData = {
          title: `آرشیو ${res.nameFa ? res.nameFa : 'هنرمند'} | اسکنت مدیا`,
          image: `${res.thumbnail ? res.thumbnail : ''}`,
          keywords: `${res.keywords}`,
          description: `${res.description}`,
        };
        this.seoSocialShareService.setData(seoData);
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.carouselService.setNavigationButton($('#slide-right-track'), $('#slide-left-track'));
      this.carouselService.setNavigationButton($('#slide-right-album'), $('#slide-left-album'));
    }
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public onFollow(): void {
    if (this.artist.followAction == 'follow' || this.artist.followAction == 'unfollow') {
      this.homeFacade.dispatchFollowArtist(this.slugId).then(() => {
        this.homeFacade.dispatchArtistRefresh(this.slugId);
      });
    } else {
      this.homeFacade.dispatchSendMessage('ابتدا در سایت وارد شوید.');
    }
  }

  public makeFriendlyNumber(int: any) {
    return this.changeNumberFormatService.makeFriendly(int);
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  };

  public addToNowPlayingTrack(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public addToNowPlayingAlbum(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingAlbum(slugId);
  }

  public addToNowPlayingArtist(): void {
    this.homeFacade.dispatchAddToNowPlayingArtist(this.slugId);
  }

  public setTrackSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public setAlbumSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistAlbumSlug(slugId);
  }

  public playTrack(slugId: string): void {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public playAlbum(slugId: string): void {
    this.homeFacade.dispatchPlayAlbum(slugId);
  }

  public playArtist(): void {
    this.homeFacade.dispatchPlayArtist(this.slugId);
  }

  public downloadTrack(slugId: string) {
    this.homeFacade.dispatchDownloadTrack(slugId);
  }

  public toPersian(text: any): string {
    return this.persianNumberService.toPersian(text);
  }

  public timeChangeFormat(time: string): string {
    return this.timeChangeFormatService.secondToHHMMSS(time);
  }

  public changePopularTracks(event: Event): void {
    if ((event.target as HTMLSelectElement).value == 'download') {
      this.homeFacade.dispatchArtistPopularDownloadsTracks(this.slugId);
    } else if ((event.target as HTMLSelectElement).value == 'rate') {
      this.homeFacade.dispatchArtistPopularRatesTracks(this.slugId);
    } else {
      this.homeFacade.dispatchArtistPopularPlaysTracks(this.slugId);
    }
  }
}
