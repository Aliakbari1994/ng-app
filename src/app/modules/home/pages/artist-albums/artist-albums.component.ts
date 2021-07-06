import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss']
})
export class ArtistAlbumsComponent implements OnInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  buttonLoading$: Observable<boolean | null> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  albums$: Observable<any[]> = this.homeFacade.albums$.pipe(takeWhile(() => this.componentActive));
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
    this.homeFacade.dispatchArtistAllAlbums(this.slugId, 1);
    const seoData: SeoSocialShareData = {
      title: `آرشیو آلبوم های هنرمند | اسکنت مدیا`,
      keywords: `موسیقی ایران، موسیقی جهان، دانلود آهنگ  ،فول آرشیو، دانلود موزیک، آهنگ جدید ، music, persian music ، موزیک خارجی، آهنگ خارجی`,
      description: `در این بخش به آرشیو آلبوم های هنرمند در وبسایت اسکنت مدیا دسترسی خواهید داشت.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public addToNowPlayingAlbum(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingAlbum(slugId);
  }

  public setAlbumSlugId(slugId: string | null): void {
    this.homeFacade.dispatchAddToPlaylistAlbumSlug(slugId);
  }

  public playAlbum(slugId: string): void {
    this.homeFacade.dispatchPlayAlbum(slugId);
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
    this.homeFacade.dispatchArtistAllAlbumsLoadMore(this.slugId, this.currentPage + 1)
  }

}
