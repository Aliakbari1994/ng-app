import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-artist-tracks',
  templateUrl: './artist-tracks.component.html',
  styleUrls: ['./artist-tracks.component.scss']
})
export class ArtistTracksComponent implements OnInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  buttonLoading$: Observable<boolean | null> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  tracks$: Observable<any[]> = this.homeFacade.tracks$.pipe(takeWhile(() => this.componentActive));
  slugId = this.route.snapshot.params['id'];
  currentPage = 1;

  constructor(
    private homeFacade: HomeFacade,
    private route: ActivatedRoute,
    private router: Router,
    private carouselService: CarouselService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) { }

  ngOnInit(): void {
    this.homeFacade.dispatchArtistAllTracks(this.slugId, 1);
    const seoData: SeoSocialShareData = {
      title: `آرشیو قطعات هنرمند | اسکنت مدیا`,
      keywords: `موسیقی ایران، موسیقی جهان، دانلود آهنگ  ،فول آرشیو، دانلود موزیک، آهنگ جدید ، music, persian music ، موزیک خارجی، آهنگ خارجی`,
      description: `در این بخش به آرشیو قطعات هنرمند در وبسایت اسکنت مدیا دسترسی خواهید داشت.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public addToNowPlayingTrack(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingTrack(slugId);
  }

  public setTrackSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistTrackSlug(slugId);
  }

  public playTrack(slugId: string): void {
    this.homeFacade.dispatchPlayTrack(slugId);
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  };

  public loadMore(): void {
    this.homeFacade.dispatchArtistAllTracksLoadMore(this.slugId, this.currentPage + 1)
  }

}
