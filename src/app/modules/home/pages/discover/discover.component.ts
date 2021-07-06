import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';

import {HomeFacade} from "../../store/home.facade";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor(
    private homeFacade: HomeFacade,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    const seoData: SeoSocialShareData = {
      title: `دانلود و پخش آنلاین موسیقی | اسکنت مدیا`,
      keywords: `دانلود آهنگ، دانلود موزیک، موسیقی، آهنگ ایرانی، آهنگ خارجی، اسکنت مدیا ، music, دانلود آهنگ جدید, skantmedia، skant media`,
      description: `دانلود و پخش آنلاین موسیقی ایران و جهان در اسکنت مدیا.`,
    };
    this.seoSocialShareService.setData(seoData);

    this.homeFacade.dispatchSlider().then(() => {
      this.homeFacade.dispatchFeaturedCategories().then(() => {
        this.homeFacade.dispatchFeature().then(() => {
          this.homeFacade.dispatchFeaturedGenres().then(() => {
            this.homeFacade.dispatchFeaturedPersianTracks().then(() => {
              this.homeFacade.dispatchFeaturedPersianAlbums().then(() => {
                this.homeFacade.dispatchFeaturedPodcasts().then(() => {
                  this.homeFacade.dispatchFeaturedPlaylistsDiscover().then(() => {
                  })
                })
              });
            });
          });
        })
      });
    });
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
  }

  ngOnDestroy(): void {
  }
}
