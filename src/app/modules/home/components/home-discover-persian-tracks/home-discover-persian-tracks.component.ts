import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit, QueryList,
  ViewChildren
} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {Router} from "@angular/router";

import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {HomeFacade} from "../../store/home.facade";
import * as $ from "jquery";

@Component({
  selector: 'app-home-discover-persian-tracks',
  templateUrl: './home-discover-persian-tracks.component.html',
  styleUrls: ['./home-discover-persian-tracks.component.scss']
})
export class HomeDiscoverPersianTracksComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  tracks$: Observable<any> = this.homeFacade.featuredPersianTracks$.pipe(takeWhile(() => this.componentActive));
  @ViewChildren('trackPosts', {read: ElementRef}) trackPosts: QueryList<ElementRef> | undefined;

  constructor(
    private carouselService: CarouselService,
    private checkPlatformService: CheckPlatformService,
    private homeFacade: HomeFacade,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.carouselService.setNavigationButton($('#slide-right-featured-persian-tracks'), $('#slide-left-featured-persian-tracks'));
    }
  }

  ngAfterViewChecked(): void {
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }

  public play(slugId: string): void {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public addToNowPlaying(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public setSlugId(slugId: string): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }
}
