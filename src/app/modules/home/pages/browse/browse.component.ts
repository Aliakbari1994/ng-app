import {AfterViewChecked, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {Observable} from "rxjs";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  sectionLoading$ = this.homeFacade.sectionLoading$.pipe(takeWhile(() => this.componentActive));
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  playlists$ = this.homeFacade.playlists$.pipe(takeWhile(() => this.componentActive));
  categories: any;

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private carouselService: CarouselService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.homeFacade.dispatchCategories();
    this.homeFacade.dispatchFeaturedPlaylists(20);
    this.zone.runOutsideAngular(() => {
      this.homeFacade.categories$.pipe(takeWhile(() => this.componentActive)).subscribe(
        res => this.categories = res,
      );
    });
    const seoData: SeoSocialShareData = {
      title: `پلی لیست ها و دسته بندی ها | اسکنت مدیا`,
      keywords: `playlist, پلی لیست, لیست بخش, دسته بندی ها`,
      description: `در این بخش پلی لیست های ویژه اسکنت مدیا را مشاهده خواهید کرد.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public play(slugId: string) {
    this.homeFacade.dispatchPlayPlaylist(slugId);
  }

  public addToNowPlaying(slugId: string): void {
    this.homeFacade.dispatchAddToNowPlayingPlaylist(slugId);
  }

  public alertToSignIn(): void {
    this.homeFacade.dispatchSendMessage('برای این عملیات، ابتدا در سایت وارد شوید.')
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }
}
