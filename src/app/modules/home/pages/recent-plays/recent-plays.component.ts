import {AfterViewChecked, Component, Host, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";

import {HomeFacade} from "../../store/home.facade";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-recent-plays',
  templateUrl: './recent-plays.component.html',
  styleUrls: ['./recent-plays.component.scss']
})
export class RecentPlaysComponent implements OnInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  tracks$: Observable<any[]> = this.homeFacade.tracks$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private homeFacade: HomeFacade,
    private carouselService: CarouselService,
    private router: Router,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) { }

  ngOnInit(): void {
    this.homeFacade.dispatchRecentPlays();
    const seoData: SeoSocialShareData = {
      title: `پلی های اخیر | اسکنت مدیا`,
      keywords: `موسیقی ایران، موسیقی جهان، دانلود آهنگ  ،فول آرشیو، دانلود موزیک، آهنگ جدید ، music, persian music ، موزیک خارجی، آهنگ خارجی`,
      description: `در این بخش به آرشیو موزیک های پلی شده توسط خودتان دسترسی دارید.`,
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
}
