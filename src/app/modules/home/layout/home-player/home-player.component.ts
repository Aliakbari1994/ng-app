import {
  AfterViewInit,
  Component,
  ElementRef, NgZone, OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Router} from "@angular/router";
import {takeWhile} from "rxjs/operators";

import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {TimeChangeFormatService} from "../../../../core/services/time-change-format/time-change-format.service";
import {ColorThiefService} from "../../../../core/services/color-thief/color-thief.service";
import * as APlayer from "aplayer";
import {HomeFacade} from "../../store/home.facade";
import * as fromDbConfig from '../../../../configs/db-settings.config';
import {NgxIndexedDBService} from "ngx-indexed-db";


@Component({
  selector: 'app-home-player',
  templateUrl: './home-player.component.html',
  styleUrls: ['./home-player.component.scss']
})
export class HomePlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cover') cover: ElementRef | undefined;
  @ViewChild('title') title: ElementRef | undefined;
  @ViewChild('artist') artist: ElementRef | undefined;
  @ViewChild('play') play: ElementRef | undefined;
  @ViewChild('next') next: ElementRef | undefined;
  @ViewChild('back') back: ElementRef | undefined;
  @ViewChild('shuffleBtn') shuffleBtn: ElementRef | undefined;
  @ViewChild('repeatBtn') repeatBtn: ElementRef | undefined;
  @ViewChild('repeatIcon') repeatIcon: ElementRef | undefined;
  @ViewChild('ptime') ptime: ElementRef | undefined;
  @ViewChild('dtime') dtime: ElementRef | undefined;
  @ViewChild('played') played: ElementRef | undefined;
  @ViewChild('buffer') buffer: ElementRef | undefined;
  @ViewChild('playerBar') playerBar: ElementRef | undefined;
  @ViewChild('playerThumb') playerThumb: ElementRef | undefined;
  @ViewChild('volumeFill') volumeFill: ElementRef | undefined;
  @ViewChild('volumeBar') volumeBar: ElementRef | undefined;
  @ViewChild('volumeBtn') volumeBtn: ElementRef | undefined;
  @ViewChild('volumeThumb') volumeThumb: ElementRef | undefined;
  @ViewChildren('gridItem', {read: ElementRef}) gridItem: QueryList<ElementRef> | undefined;
  ap: any;
  listenerFn: (() => void) | undefined;
  componentActive = true;
  player$ = this.homeFacade.player$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private renderer: Renderer2,
    private checkPlatformService: CheckPlatformService,
    private timeChangeFormatService: TimeChangeFormatService,
    private colorThiefService: ColorThiefService,
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private router: Router,
    private dbService: NgxIndexedDBService,
  ) {
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.zone.runOutsideAngular(() => {
        this.dbService.getAll(fromDbConfig.homePlayerKey).pipe(takeWhile(() => this.componentActive)).subscribe(
          res => {
            if (res.length) {
              this.homeFacade.dispatchInitPlayerTracks(res)
            }
          }
        );
        this.player$.pipe(takeWhile(() => this.componentActive)).subscribe(
          res => {
            let tracks = JSON.parse(JSON.stringify(res.tracks));
            this.ap = new APlayer({
              container: document.getElementById('a-player'),
              loop: 'none',
              order: 'list',
              volume: 0.7,
              audio: tracks
            });
            this.ap?.on('loadstart', () => {
              const data = this.ap.list.audios[this.ap.list.index];
              this.renderer.setAttribute(this.cover?.nativeElement, 'src', data.cover);
              this.renderer.setAttribute(this.cover?.nativeElement, 'alt', `${data.artist} - ${data.name}`);
              this.renderer.setProperty(this.title?.nativeElement, 'innerHTML', data.name);
              this.renderer.setProperty(this.artist?.nativeElement, 'innerHTML', data.artist);
              this.renderer.listen(this.cover?.nativeElement, 'load', () => {
                const avgColorWithAlpha = this.colorThiefService.getAverageColor(this.cover?.nativeElement, 0.6);
                const avgColor = this.colorThiefService.getAverageColor(this.cover?.nativeElement);
                this.gridItem?.forEach(item => {
                  this.renderer.setStyle(item?.nativeElement, 'background-color', avgColorWithAlpha);
                });
                this.renderer.setStyle(this.playerThumb?.nativeElement, 'background-color', avgColor);
                this.renderer.setStyle(this.volumeThumb?.nativeElement, 'background-color', avgColor);
              });
            });
            this.ap?.on('ended', () => {
            })
            this.ap?.on('loadeddata', () => {
              const data = this.ap.list.audios[this.ap.list.index];
              this.homeFacade.dispatchStorePlay(data.playable, data.slug);
              const duration = this.timeChangeFormatService.secondToHHMMSS(this.ap.audio.duration);
              this.renderer.setProperty(this.dtime?.nativeElement, 'innerHTML', duration);
              const current = this.timeChangeFormatService.secondToHHMMSS(this.ap.audio.currentTime);
              this.renderer.setProperty(this.ptime?.nativeElement, 'innerHTML', current);
              this.homeFacade.dispatchUpdateNowPlaying(data.playable, data.slug, data.duration, data.name, data.artist, data.url, data.cover, data.type);
            });
            this.ap?.on('timeupdate', () => {
              const position = this.ap.audio.currentTime / this.ap.audio.duration;
              this.renderer.setStyle(this.played?.nativeElement, 'width', position * 100 + '%');
              const current = this.timeChangeFormatService.secondToHHMMSS(this.ap.audio.currentTime);
              this.renderer.setProperty(this.ptime?.nativeElement, 'innerHTML', current);
            });
            this.ap?.on('progress', () => {
              if (this.ap.audio.duration > 0) {
                for (let i = 0; i < this.ap.audio.buffered.length; i++) {
                  if (this.ap.audio.buffered.start(this.ap.audio.buffered.length - 1 - i) <= this.ap.audio.currentTime) {
                    this.renderer.setStyle(
                      this.buffer?.nativeElement,
                      'width',
                      (this.ap.audio.buffered.end(this.ap.audio.buffered.length - 1 - i) / this.ap.audio.duration) * 100 + '%'
                    );
                  }
                }
              }
            });
            this.ap?.on('volumechange', () => {
              if (this.ap.audio.muted) {
                this.renderer.removeClass(this.volumeBtn?.nativeElement, this.volumeBtn?.nativeElement.classList.value);
                this.renderer.addClass(this.volumeBtn?.nativeElement, 'tio-volume-mute');
              } else if (this.ap.volume() === 0) {
                this.renderer.removeClass(this.volumeBtn?.nativeElement, this.volumeBtn?.nativeElement.classList.value);
                this.renderer.addClass(this.volumeBtn?.nativeElement, 'tio-volume-down');
              } else if (this.ap.volume() <= 0.5) {
                this.renderer.removeClass(this.volumeBtn?.nativeElement, this.volumeBtn?.nativeElement.classList.value);
                this.renderer.addClass(this.volumeBtn?.nativeElement, 'tio-volume-low');
              } else if (this.ap.volume() <= 1) {
                this.renderer.removeClass(this.volumeBtn?.nativeElement, this.volumeBtn?.nativeElement.classList.value);
                this.renderer.addClass(this.volumeBtn?.nativeElement, 'tio-volume-up');
              }
              if (!this.ap.audio.muted) {
              }
            });
            if (this.playerThumb) {
              this.renderer.listen(this.playerThumb?.nativeElement, 'touchstart', () => {
                this.renderer.listen(this.playerBar?.nativeElement, 'touchmove', (event) => {
                  this.seekBar(event.touches[0]);
                  this.renderer.addClass(this.playerThumb?.nativeElement, 'thumb-move');
                });
              });
              this.renderer.listen(this.playerThumb?.nativeElement, 'touchend', () => {
                if (this.listenerFn) {
                  this.listenerFn();
                }
                this.renderer.removeClass(this.playerThumb?.nativeElement, 'thumb-move');
              });
            }
            this.renderer.setStyle(this.volumeFill?.nativeElement, 'width', this.ap?.volume() * 100 + '%');
          }
        );
      });
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public playPause(): void {
    if (this.ap?.paused) {
      this.ap.play();
      this.renderer.removeClass(this.play?.nativeElement, 'tio-play');
      this.renderer.addClass(this.play?.nativeElement, 'tio-pause');
    } else {
      this.ap.pause();
      this.renderer.removeClass(this.play?.nativeElement, 'pause');
      this.renderer.addClass(this.play?.nativeElement, 'tio-play');
    }
  }

  public skipNext(): void {
    this.ap?.skipForward();
  }

  public skipBack(): void {
    this.ap?.skipBack();
  }

  public shuffle(): void {
    if (this.ap?.list.player.options.order === undefined || this.ap?.list.player.options.order === 'list') {
      this.ap.list.player.options.order = 'random';
      this.renderer.addClass(this.shuffleBtn?.nativeElement, 'active');
    } else if (this.ap?.list.player.options.order === 'random') {
      this.ap.list.player.options.order = 'list';
      this.renderer.removeClass(this.shuffleBtn?.nativeElement, 'active');
    }
  }

  public repeat(): void {
    switch (this.ap?.list.player.options.loop) {
      case undefined :
        this.ap.list.player.options.loop = 'one';
        this.renderer.addClass(this.repeatBtn?.nativeElement, 'active');
        this.renderer.removeClass(this.repeatIcon?.nativeElement, 'tio-repeat');
        this.renderer.addClass(this.repeatIcon?.nativeElement, 'tio-replay');
        break;
      case 'none':
        this.ap.list.player.options.loop = 'one';
        this.renderer.addClass(this.repeatBtn?.nativeElement, 'active');
        this.renderer.removeClass(this.repeatIcon?.nativeElement, 'tio-repeat');
        this.renderer.addClass(this.repeatIcon?.nativeElement, 'tio-replay');
        break;
      case 'one' :
        this.ap.list.player.options.loop = 'all';
        this.renderer.removeClass(this.repeatIcon?.nativeElement, 'tio-replay');
        this.renderer.addClass(this.repeatIcon?.nativeElement, 'tio-repeat');
        break;
      case 'all' :
        this.ap.list.player.options.loop = 'none';
        this.renderer.removeClass(this.repeatBtn?.nativeElement, 'active');
    }
  }

  public seekBar(e: MouseEvent): void {
    const bar = this.playerBar?.nativeElement;
    const position = ((e.clientX) - (bar.offsetLeft)) / (bar.offsetWidth) * 100;
    const duration = this.ap.audio.duration;
    this.ap.seek(position * duration / 100);
  }

  public thumbDown(): void {
    this.listenerFn = this.renderer.listen(this.playerBar?.nativeElement, 'mousemove', (event) => {
      this.renderer.addClass(this.playerThumb?.nativeElement, 'thumb-move');
      this.seekBar(event);
    });
  }

  public thumbUp(): void {
    if (this.listenerFn) {
      this.listenerFn();
    }
    this.renderer.removeClass(this.playerThumb?.nativeElement, 'thumb-move');
  }

  public volumeSeekBar(e: MouseEvent): void {
    const bar = this.volumeBar?.nativeElement;
    const position = ((e.clientX) - (bar.offsetLeft)) / (bar.offsetWidth);
    this.renderer.setStyle(this.volumeFill?.nativeElement, 'width', position * 100 + '%');
    this.ap.volume(position, true);
  }

  public muted(): void {
    this.ap.audio.muted = !!this.ap.volume();
  }

  public trackPage(): void {
    const data = this.ap.list.audios[this.ap.list.index];
    if (data.playable == 'track') {
      this.router.navigate([data.playable, data.slug]).then(r => {
      });
    } else if (data.playable == 'episode') {
      this.router.navigate(['podcast', data.podcastSlug]).then(r => {
      });
    }
  }

  public onNowPlaying(): void {
    this.router.navigate(['/now-playing']).then();
  }
}
