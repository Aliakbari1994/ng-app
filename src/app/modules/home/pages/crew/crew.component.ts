import {AfterViewChecked, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit, AfterViewChecked, OnDestroy {

  buttonLoading$: Observable<boolean> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  musics$ = this.homeFacade.musics$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  componentActive = true;
  slugId = this.route.snapshot.params['slug'];
  currentPage = 1;

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private carouselService: CarouselService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) { }

  ngOnInit(): void {
    this.homeFacade.dispatchArtistAllMusics(this.slugId, 1);
    const seoData: SeoSocialShareData = {
      title: `آرشیو آثار هنرمند | اسکنت مدیا`,
      keywords: `موسیقی ایران، موسیقی جهان، دانلود آهنگ ، دانلود موزیک، آهنگ جدید ، music, persian music ، موزیک خارجی، آهنگ خارجی`,
      description: `در این بخش به آرشیو آثار هنرمند در وبسایت اسکنت مدیا دسترسی خواهید داشت.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  };

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  };

  public playTrack(slugId: string): void {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public playAlbum(slugId: string): void {
    this.homeFacade.dispatchPlayAlbum(slugId);
  }

  public setTrackSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public setAlbumSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistAlbumSlug(slugId);
  }

  public addToNowPlayingTrack(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public addToNowPlayingAlbum(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingAlbum(slugId);
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public loadMore(): void {
    this.homeFacade.dispatchArtistAllMusicsLoadMore(this.slugId, this.currentPage + 1)
  }
}
