import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {HomeFacade} from "../../store/home.facade";

@Component({
  selector: 'app-profile-followers',
  templateUrl: './profile-followers.component.html',
  styleUrls: ['./profile-followers.component.scss']
})
export class ProfileFollowersComponent implements OnInit, OnDestroy {

  componentActive = true;
  username = this.route.snapshot.params['id'];
  isLoggedIn$: Observable<boolean> = this.homeFacade.isLoggedIn$.pipe(takeWhile(() => this.componentActive));
  buttonLoading$: Observable<boolean> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  followers$ = this.homeFacade.followers$.pipe(takeWhile(() => this.componentActive));
  currentPage = 1;

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private route: ActivatedRoute,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.route.params.subscribe(params => {
        this.username = params['id'];
        this.homeFacade.dispatchProfileAllFollowers(this.username, 1);
        this.homeFacade.pagination$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
          this.currentPage = res.currentPage
        });
      });
    });
    const seoData: SeoSocialShareData = {
      title: `لیست دنبال کنندگان | اسکنت مدیا`,
      keywords: `دنیال کنندگان ، Followers`,
      description: `در این بخش افراد دنبال کننده کاربر را مشاهده خواهید کرد.`,
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
    this.homeFacade.dispatchProfileLoadMoreAllFollowers(this.username, this.currentPage + 1)
  }
}
