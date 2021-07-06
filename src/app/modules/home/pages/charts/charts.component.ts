import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HomeFacade} from "../../store/home.facade";
import {takeWhile} from "rxjs/operators";
import {Observable} from "rxjs";
import {PersianNumberService} from "ngx-persian";
import {TimeChangeFormatService} from "../../../../core/services/time-change-format/time-change-format.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {

  sortBy: string = 'play';
  duration: string = 'week';
  type: string = 'persian';

  componentActive = true;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  tracks$ = this.homeFacade.tracks$.pipe(takeWhile(() => this.componentActive));
  playerNowPlaying$ = this.homeFacade.playerNowPlaying$.pipe(takeWhile(() => this.componentActive));
  sectionLoading$ = this.homeFacade.sectionLoading$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private homeFacade: HomeFacade,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private persianNumberService: PersianNumberService,
    private timeChangeFormatService: TimeChangeFormatService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.homeFacade.dispatchChartsTrack(this.type, this.duration, this.sortBy);
    this.zone.runOutsideAngular(() => {
      this.route.queryParams.subscribe(params => {
        this.sortBy = params['sort_by'] ? params['sort_by'] : 'play';
        this.duration = params['duration'] ? params['duration'] : 'week';
        this.type = params['type'] ? params['type'] : 'persian';
        this.homeFacade.dispatchChartsTrackRefresh(this.type, this.duration, this.sortBy);
      })
    });
    const seoData: SeoSocialShareData = {
      title: `لیست قطعات برتر | اسکنت مدیا`,
      keywords: `charts, top track, قطعات برتر ، آهنگ برتر`,
      description: `در این بخش لیست قطعات برتر را در وبسایت اسکنت مدیا مشاهده خواهید کرد.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public changeTopTrackSortBy(event: Event): void {
    this.router.navigate(
      ['/charts'],
      {
        relativeTo: this.route,
        queryParams: {sort_by: (event.target as HTMLSelectElement).value},
        queryParamsHandling: 'merge'
      }).then();
  }

  public changeTopTrackDuration(event: Event): void {
    this.router.navigate(
      ['/charts'],
      {
        relativeTo: this.route,
        queryParams: {duration: (event.target as HTMLSelectElement).value},
        queryParamsHandling: 'merge'
      }).then();
  }

  public changeTopTrackType(event: Event): void {
    this.router.navigate(
      ['/charts'],
      {
        relativeTo: this.route,
        queryParams: {type: (event.target as HTMLSelectElement).value},
        queryParamsHandling: 'merge'
      }).then();
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public toPersian(text: any): string {
    return this.persianNumberService.toPersian(text);
  }

  public timeChangeFormat(time: string): string {
    return this.timeChangeFormatService.secondToHHMMSS(time);
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }

  public playTrack(slugId: string) {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public downloadTrack(slugId: string) {
    this.homeFacade.dispatchDownloadTrack(slugId);
  }

  public addToNowPlayingTrack(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public setSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }
}
