import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {takeWhile} from "rxjs/operators";
import {Observable} from "rxjs";

import {HomeFacade} from "../../store/home.facade";
import {TimeChangeFormatService} from "../../../../core/services/time-change-format/time-change-format.service";
import {CountdownService} from "../../../../core/services/countdown/countdown.service";
import {Album} from "../../../../shared/models/album/album.model";
import {PersianNumberService} from "ngx-persian";
import {RateService} from "../../../../core/services/rate/rate.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  album: Album = {
    thumbnail: null,
    titleFa: '',
    titleEn: '',
    albumRate: 0,
    userRate: 0,
    countVoters: 0,
    explicit: false,
    ownerArtists: [],
    featArtists: [],
    publicationYear: '',
    type: null,
    duration: '',
    genres: [],
    slugId: null,
    slug: null,
    accessibility: {
      type: null,
      price: {
        toman: null,
        dollar: null
      }
    },
    support: {
      available: false,
      price: {
        toman: null,
        dollar: null
      }
    },
    publishedAt: null,
    timeNow: null,
    keywords: null,
    description: null,
  };
  slugId = this.route.snapshot.params['id'];
  albumTracks: any;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  sectionLoading$ = this.homeFacade.sectionLoading$.pipe(takeWhile(() => this.componentActive));
  playerNowPlaying$ = this.homeFacade.playerNowPlaying$.pipe(takeWhile(() => this.componentActive));
  url = this.checkPlatformService.isBrowser ? window.location.href : '';

  constructor(
    private homeFacade: HomeFacade,
    private route: ActivatedRoute,
    private zone: NgZone,
    private timeChangeFormatService: TimeChangeFormatService,
    private countdownService: CountdownService,
    private persianNumberService: PersianNumberService,
    private rateService: RateService,
    private router: Router,
    private checkPlatformService: CheckPlatformService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.route.params.subscribe(params => {
        this.slugId = params['id'];
        this.homeFacade.dispatchAlbum(this.slugId);
        this.homeFacade.dispatchAlbumTracks(this.slugId);
        this.homeFacade.dispatchRelatedTracks('album', this.slugId);
        this.homeFacade.dispatchShowComments('album', this.slugId, 1);
      });
      this.homeFacade.album$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.album = res;
        if (res.publishedAt && res.timeNow && (res.publishedAt > res.timeNow)) {
          this.countdownService.createCountDown(res.publishedAt, res.timeNow);
        }
        // seo
        let artist = '';
        res.ownerArtists.forEach((owner, index) => {
          artist += owner['name_fa'];
          if (res.ownerArtists.length > 1 && index != res.ownerArtists.length - 1) {
            artist += ' و '
          }
        });
        const seoData: SeoSocialShareData = {
          title: `آلبوم ${res.titleFa ? res.titleFa : res.titleEn} از ${artist} | اسکنت مدیا`,
          image: `${res.thumbnail}`,
          keywords: `${res.keywords}`,
          description: `${res.description}`,
        };
        this.seoSocialShareService.setData(seoData);
      });
      this.homeFacade.albumTracks$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.albumTracks = res
      });
    });
  }

  ngAfterViewInit(): void {
    this.rateService.track('album', this.slugId);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public timeChangeFormat(time: string): string {
    return this.timeChangeFormatService.secondToHHMMSS(time);
  }

  public toPersian(text: any): string {
    return this.persianNumberService.toPersian(text);
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }

  public play(): void {
    this.homeFacade.dispatchPlayAlbum(this.slugId);
  }

  public playTrack(slugId: string) {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public addToNowPlaying(): void {
    this.homeFacade.dispatchAddToNowPlayingAlbum(this.slugId);
  }

  public addToNowPlayingTrack(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public downloadTrack(slugId: string) {
    this.homeFacade.dispatchDownloadTrack(slugId);
  }

  public setAlbumSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistAlbumSlug(slugId);
  }

  public setSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }
}
