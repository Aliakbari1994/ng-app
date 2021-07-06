import {AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {HomeFacade} from "../../store/home.facade";
import * as $ from 'jquery';

@Component({
  selector: 'app-home-related-carousel',
  templateUrl: './home-related-carousel.component.html',
  styleUrls: ['./home-related-carousel.component.scss']
})
export class HomeRelatedCarouselComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  related$: Observable<any> = this.homeFacade.relatedTracks$.pipe(takeWhile(() => this.componentActive));

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
      this.carouselService.setNavigationButton($('#slide-right-related'), $('#slide-left-related'));
    }
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
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
