import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {Router} from "@angular/router";

import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {HomeFacade} from "../../store/home.facade";
import * as $ from "jquery";

@Component({
  selector: 'app-home-discover-persian-albums',
  templateUrl: './home-discover-persian-albums.component.html',
  styleUrls: ['./home-discover-persian-albums.component.scss']
})
export class HomeDiscoverPersianAlbumsComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  albums$: Observable<any> = this.homeFacade.featuredPersianAlbums$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private carouselService: CarouselService,
    private checkPlatformService: CheckPlatformService,
    private homeFacade: HomeFacade,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.carouselService.setNavigationButton($('#slide-right-featured-persian-albums'), $('#slide-left-featured-persian-albums'));
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
    this.homeFacade.dispatchPlayAlbum(slugId);
  }

  public addToNowPlaying(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingAlbum(slugId);
  }

  public setSlugId(slugId: string): void {
    this.homeFacade.dispatchAddToPlaylistAlbumSlug(slugId);
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }
}
