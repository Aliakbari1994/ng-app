import {AfterViewChecked, AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

import {HomeFacade} from "../../store/home.facade";
import {ProfileData} from "../../../../shared/models/profile-data/profile-data.model";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {CarouselService} from "../../../../core/services/carousel/carousel.service";
import * as $ from "jquery";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {ChangeNumberFormatService} from "../../../../core/services/change-number-format/change-number-format.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  componentActive = true;
  url = this.checkPlatformService.isBrowser ? window.location.href : '';
  username = this.route.snapshot.params['id'];
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  buttonLoading$: Observable<boolean | null> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  sectionLoading$: Observable<boolean | null> = this.homeFacade.sectionLoading$.pipe(takeWhile(() => this.componentActive));
  followers$: Observable<any[]> = this.homeFacade.followers$.pipe(takeWhile(() => this.componentActive));
  followings$: Observable<any[]> = this.homeFacade.followings$.pipe(takeWhile(() => this.componentActive));
  playlists$ = this.homeFacade.playlists$.pipe(takeWhile(() => this.componentActive));
  profileData: ProfileData = {
    userId: null,
    userName: null,
    userAvatar: null,
    followingsCount: 0,
    followersCount: 0,
    publicPlaylistsCount: 0,
    followAction: null
  };

  constructor(
    private homeFacade: HomeFacade,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    private checkPlatformService: CheckPlatformService,
    private carouselService: CarouselService,
    private changeNumberFormatService: ChangeNumberFormatService,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.route.params.subscribe(params => {
        this.username = params['id'];
        this.homeFacade.dispatchProfilePage(this.username);
        this.homeFacade.dispatchProfilePublicPlaylists(this.username);
        this.homeFacade.dispatchProfileFollowers(this.username);
        this.homeFacade.dispatchProfileFollowings(this.username);
      });
      this.homeFacade.profilePageData$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.profileData = {
          userId: res.userId,
          userName: res.userName,
          userAvatar: res.userAvatar,
          followingsCount: res.followingsCount,
          followersCount: res.followersCount,
          publicPlaylistsCount: res.publicPlaylistsCount,
          followAction: res.followAction
        };
        const seoData: SeoSocialShareData = {
          title: `صفحه کاربری ${res.userName ? res.userName : ''} | اسکنت مدیا`,
          image: `${res.userAvatar ? res.userAvatar : ''}`,
          keywords: `،کاربر، صفحه کاربری، user page, صفحه پروفایل، پروفایل کاربری، profile`,
          description: `صفحه شخصی کاربر را در این صفحه مشاهده میکنید.`,
        };
        this.seoSocialShareService.setData(seoData);
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.checkPlatformService.isBrowser) {
      this.carouselService.setNavigationButton($('#slide-right-playlists'), $('#slide-left-playlists'));
      this.carouselService.setNavigationButton($('#slide-left-followers'), $('#slide-left-followers'));
      this.carouselService.setNavigationButton($('#slide-left-followings'), $('#slide-left-followings'));
    }
  }

  ngAfterViewChecked(): void {
    this.carouselService.setElementsColors();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public onFollow(): void {
    if (this.profileData.followAction == 'follow' || this.profileData.followAction == 'unfollow') {
      if (this.profileData.userId) {
        this.homeFacade.dispatchFollowUser(this.profileData.userId).then(() => {
          this.homeFacade.dispatchProfilePageRefresh(this.username);
          this.homeFacade.dispatchProfileFollowers(this.username);
        });
      }
    } else if (this.profileData.followAction == 'profile') {
      this.router.navigate(['/account']).then();
    } else {
      this.homeFacade.dispatchSendMessage('ابتدا در سایت وارد شوید.');
    }
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

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }

  public makeFriendlyNumber(int: any) {
    return this.changeNumberFormatService.makeFriendly(int);
  }
}
