import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeWhile} from "rxjs/operators";
import {Observable} from "rxjs";

import {PersianNumberService} from "ngx-persian";
import {HomeFacade} from "../../store/home.facade";
import {TimeChangeFormatService} from "../../../../core/services/time-change-format/time-change-format.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {ChangeNumberFormatService} from "../../../../core/services/change-number-format/change-number-format.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})
export class PodcastComponent implements OnInit, OnDestroy {

  componentActive = true;
  slugId = this.route.snapshot.params['id'];
  buttonLoading$: Observable<boolean | null> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  sectionLoading$ = this.homeFacade.sectionLoading$.pipe(takeWhile(() => this.componentActive));
  podcast$ = this.homeFacade.podcast$.pipe(takeWhile(() => this.componentActive));
  playerNowPlaying$ = this.homeFacade.playerNowPlaying$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  followAction: string | null = null;
  podcastEpisodes: any;
  url = this.checkPlatformService.isBrowser ? window.location.href : '';

  constructor(
    private homeFacade: HomeFacade,
    private route: ActivatedRoute,
    private timeChangeFormatService: TimeChangeFormatService,
    private persianNumberService: PersianNumberService,
    private zone: NgZone,
    private changeNumberFormatService: ChangeNumberFormatService,
    private checkPlatformService: CheckPlatformService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.route.params.subscribe(params => {
        this.slugId = params['id'];
        this.homeFacade.dispatchPodcast(this.slugId);
        this.homeFacade.dispatchPodcastEpisodes(this.slugId);
        this.homeFacade.dispatchShowComments('podcast', this.slugId, 1);
      });
      this.podcast$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.followAction = res.followAction;
        const seoData: SeoSocialShareData = {
          title: `پادکست ${res.titleFa ? res.titleFa : res.titleEn} |  اسکنت مدیا`,
          image: `${res.thumbnail}`,
          keywords: `${res.keywords}`,
          description: `${res.description}`,
        };
        this.seoSocialShareService.setData(seoData);
      });
      this.homeFacade.podcastEpisodes$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.podcastEpisodes = res
      });
    });
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

  public onFollow(): void {
    if (this.followAction == 'follow' || this.followAction == 'unfollow') {
      this.homeFacade.dispatchFollowPodcast(this.slugId).then(() => {
        this.homeFacade.dispatchPodcastRefresh(this.slugId);
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

  public download(slugId: string) {
    this.homeFacade.dispatchDownloadEpisode(slugId);
  }

  public playEpisode(slugId: string) {
    this.homeFacade.dispatchPlayEpisode(slugId);
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }
}
