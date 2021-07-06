import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {HomeFacade} from "../../store/home.facade";
import {PersianNumberService} from "ngx-persian";
import {TimeChangeFormatService} from "../../../../core/services/time-change-format/time-change-format.service";
import * as fromDbConfig from "../../../../configs/db-settings.config";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnDestroy {

  componentActive = true;
  player$ = this.homeFacade.player$.pipe(takeWhile(() => this.componentActive));
  playerNowPlaying$ = this.homeFacade.playerNowPlaying$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private homeFacade: HomeFacade,
    private persianNumberService: PersianNumberService,
    private timeChangeFormatService: TimeChangeFormatService,
    private zone: NgZone,
    private dbService: NgxIndexedDBService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    const seoData: SeoSocialShareData = {
      title: `لیست در حال پخش | اسکنت مدیا`,
      keywords: `لیست پخش، now playing`,
      description: `در این بخش به لیست در حال پخش دسترسی دارید.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug;
  }

  public toPersian(text: any): string {
    return this.persianNumberService.toPersian(text);
  }

  public playTrack(slugId: string) {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public downloadTrack(slugId: string) {
    this.homeFacade.dispatchDownloadTrack(slugId);
  }

  public timeChangeFormat(time: string): string {
    return this.timeChangeFormatService.secondToHHMMSS(time);
  }

  public downloadEpisode(slugId: string) {
    this.homeFacade.dispatchDownloadEpisode(slugId);
  }

  public playEpisode(slugId: string) {
    this.homeFacade.dispatchPlayEpisode(slugId);
  }

  public remove(slug: string, id: number) {
    this.zone.runOutsideAngular(() => {
      this.homeFacade.dispatchRemoveFromPlaylist(slug, id).then(() => {
        this.dbService.getAll(fromDbConfig.homePlayerKey).pipe(takeWhile(() => this.componentActive)).subscribe(
          res => {
            if (res.length) {
              this.homeFacade.dispatchInitPlayerTracks(res)
            }
          }
        );
      })
    });
  }
}
