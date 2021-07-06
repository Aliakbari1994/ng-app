import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {takeWhile} from "rxjs/operators";
import {Observable} from "rxjs";

import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {HomeFacade} from "../../store/home.facade";
import {Track} from "../../../../shared/models/track/track.model";
import {TimeChangeFormatService} from "../../../../core/services/time-change-format/time-change-format.service";
import {CountdownService} from "../../../../core/services/countdown/countdown.service";
import {RateService} from "../../../../core/services/rate/rate.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {ChangeNumberFormatService} from "../../../../core/services/change-number-format/change-number-format.service";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  track: Track = {
    thumbnail: null,
    titleFa: '',
    titleEn: '',
    trackRate: 0,
    userRate: 0,
    countVoters: 0,
    explicit: false,
    ownerArtists: [],
    featArtists: [],
    publicationYear: '',
    type: null,
    duration: '',
    plays: '',
    downloads: '',
    genres: [],
    slug: null,
    slugId: null,
    video: {
      title_fa: '',
      title_en: '',
      slug: null,
      slug_id: null,
    },
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
    musicArtists: [],
    singerArtists: [],
    instrumentalistArtists: [],
    lyricistArtists: [],
    arrangementArtists: [],
    mixMasterArtists: [],
    lyrics: '',
    keywords: null,
    description: null,
  };
  slugId = this.route.snapshot.params['id'];
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  url = this.checkPlatformService.isBrowser ? window.location.href : '';

  constructor(
    private homeFacade: HomeFacade,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private timeChangeFormatService: TimeChangeFormatService,
    private countdownService: CountdownService,
    private rateService: RateService,
    private checkPlatformService: CheckPlatformService,
    private changeNumberFormatService: ChangeNumberFormatService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.route.params.subscribe(params => {
        this.slugId = params['id'];
        this.homeFacade.dispatchTrack(this.slugId);
        this.homeFacade.dispatchRelatedTracks('track', this.slugId);
        this.homeFacade.dispatchShowComments('track', this.slugId, 1);
      });
      this.homeFacade.track$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.track = res;
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
          title: `آهنگ ${res.titleFa ? res.titleFa : res.titleEn} از ${artist} | اسکنت مدیا`,
          image: `${res.thumbnail}`,
          keywords: `${res.keywords}`,
          description: `${res.description}`,
        };
        this.seoSocialShareService.setData(seoData);
      });
    });
  }

  ngAfterViewInit(): void {
    this.rateService.track('track', this.slugId);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public timeChangeFormat(time: string): string {
    return this.timeChangeFormatService.secondToHHMMSS(time);
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }

  public play(): void {
    this.homeFacade.dispatchPlayTrack(this.slugId);
  }

  public addToNowPlaying(): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(this.slugId);
  }

  public setSlugId(slugId: string): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public makeFriendlyNumber(int: any) {
    return this.changeNumberFormatService.makeFriendly(int);
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public download() {
    this.homeFacade.dispatchDownloadTrack(this.slugId);
  }
}
