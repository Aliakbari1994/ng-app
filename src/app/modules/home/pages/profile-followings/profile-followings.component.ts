import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

import {HomeFacade} from "../../store/home.facade";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";

@Component({
  selector: 'app-profile-followings',
  templateUrl: './profile-followings.component.html',
  styleUrls: ['./profile-followings.component.scss']
})
export class ProfileFollowingsComponent implements OnInit, OnDestroy {

  componentActive = true;
  username = this.route.snapshot.params['id'];
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  buttonLoading$: Observable<boolean> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  followings$ = this.homeFacade.followings$.pipe(takeWhile(() => this.componentActive));
  currentPage = 1;

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.route.params.subscribe(params => {
        this.username = params['id'];
        this.homeFacade.dispatchProfileAllFollowings(this.username, 1);
        this.homeFacade.pagination$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
          this.currentPage = res.currentPage
        });
      });
    });
    const seoData: SeoSocialShareData = {
      title: `لیست دنبال شدگان | اسکنت مدیا`,
      keywords: `دنیال شدگان ، Followings`,
      description: `در این بخش افراد دنبال شده کاربر را مشاهده خواهید کرد.`,
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public trackByFunc(index: number, el: any): number {
    return el.slug_id;
  }

  public loadMore(): void {
    this.homeFacade.dispatchProfileLoadMoreAllFollowings(this.username, this.currentPage + 1)
  }

  public shortLink(path: string, id: string) {
    return this.router.navigate([path, id])
  }
}
