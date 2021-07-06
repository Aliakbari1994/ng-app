import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import * as $ from "jquery";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";

@Component({
  selector: 'app-home-discover-playlists',
  templateUrl: './home-discover-playlists.component.html',
  styleUrls: ['./home-discover-playlists.component.scss']
})
export class HomeDiscoverPlaylistsComponent implements OnInit, OnDestroy, AfterViewChecked {

  componentActive = true;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  playlists$: Observable<any> = this.homeFacade.featuredPlaylists$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private homeFacade: HomeFacade,
    private carouselService: CarouselService,
    private checkPlatformService: CheckPlatformService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.carouselService.setNavigationButton($('#slide-right-featured-playlists'), $('#slide-left-featured-playlists'));
    }
  }

  ngAfterViewChecked(): void {
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public play(slugId: string): void {
    this.homeFacade.dispatchPlayPlaylist(slugId);
  }

  public addToNowPlaying(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingPlaylist(slugId);
  }
}
