import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";

import {HomeFacade} from "../../store/home.facade";
import {TimeChangeFormatService} from "../../../../core/services/time-change-format/time-change-format.service";
import {PersianNumberService} from "ngx-persian";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {Playlist} from "../../../../shared/models/playlist/playlist.model";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  componentActive = true;
  slugId = this.route.snapshot.params['id'];
  sectionLoading$ = this.homeFacade.sectionLoading$.pipe(takeWhile(() => this.componentActive));
  playerNowPlaying$ = this.homeFacade.playerNowPlaying$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  playlist: Playlist = {
    thumbnail: null,
    title: '',
    slugId: null,
    type: null,
    featured: false,
    creatorId: '',
    creatorName: '',
    tracksCount: 0,
    duration: '',
    buttonStatus: null,
    keywords: null,
    description: null,
  };
  playlistTracks: any;
  url = this.checkPlatformService.isBrowser ? window.location.href : '';
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', []],
    featured: ['', []],
  });

  constructor(
    private homeFacade: HomeFacade,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private timeChangeFormatService: TimeChangeFormatService,
    private persianNumberService: PersianNumberService,
    private checkPlatformService: CheckPlatformService,
    private readonly seoSocialShareService: SeoSocialShareService,
    private zone: NgZone,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slugId = params['id'];
      this.homeFacade.dispatchPlaylist(this.slugId);
      this.homeFacade.dispatchPlaylistTracks(this.slugId);
    });
    this.zone.runOutsideAngular(() => {
      this.homeFacade.playlist$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.playlist = res;
        const seoData: SeoSocialShareData = {
          title: `پلی لیست ${res.title} | اسکنت مدیا`,
          image: `${res.thumbnail ? res.thumbnail : ''}`,
          keywords: `${res.keywords ? res.keywords : `${res.title}, پلی لیست`}`,
          description: `${res.description ? res.description : `شنونده پلی لیست ${res.title} از اسکنت مدیا هستید.`}`,
        };
        this.seoSocialShareService.setData(seoData);
        this.form.patchValue({
          title: res.title,
          type: res.type == 'public',
          featured: res.featured
        });
      });
      this.homeFacade.playlistTracks$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.playlistTracks = res
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

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }

  public play(): void {
    this.homeFacade.dispatchPlayPlaylist(this.slugId);
  }

  public playTrack(slugId: string) {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public addToNowPlayingTrack(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public setSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public addToNowPlaying(): void {
    this.homeFacade.dispatchAddToNowPlayingPlaylist(this.slugId);
  }

  public downloadTrack(slugId: string): void {
    this.homeFacade.dispatchDownloadTrack(slugId);
  }

  public removePlaylist(): void {
    this.homeFacade.dispatchRemovePlaylist(this.slugId);
  }

  public removeTrack(slugId: string): void {
    this.homeFacade.dispatchRemoveTrackFromPlaylist(slugId, this.slugId).then(
      () => this.homeFacade.dispatchPlaylistTracks(this.slugId)
    );
  }

  get title(): AbstractControl {
    return this.form.get('title') as AbstractControl;
  }

  get type(): AbstractControl {
    return this.form.get('type') as AbstractControl;
  }

  get featured(): AbstractControl {
    return this.form.get('featured') as AbstractControl;
  }

  public onUpdate() {
    if (this.form.invalid) {
      return;
    }
    const playlistType = this.type.value ? 'public' : 'private';
    this.homeFacade.dispatchUpdatePlaylist(this.slugId, this.title.value, playlistType, this.featured.value).then(
      () => this.homeFacade.dispatchRefreshPlaylist(this.slugId)
    )
  }
}
