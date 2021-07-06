import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";

import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";

import {HomeFacade} from "../../store/home.facade";
import {CurrentUser} from "../../../../shared/models/current-user/current-user.model";
import {PersianNumberService} from "ngx-persian";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  currentUser$: Observable<CurrentUser> = this.homeFacade.currentUser$.pipe(takeWhile(() => this.componentActive));
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', []],
    featured: ['', []],
  });

  constructor(
    private homeFacade: HomeFacade,
    private readonly seoSocialShareService: SeoSocialShareService,
    private fb: FormBuilder,
    private persianNumberService: PersianNumberService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const seoData: SeoSocialShareData = {
      title: 'اسکنت مدیا - حساب کاربری',
      keywords: 'حساب کاربری',
      description: 'حساب کاربری در وبسایت اسکنت مدیا',
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public onSignOut(): void {
    this.homeFacade.dispatchSignOut();
  }

  get title(): AbstractControl {
    return this.form.get('title') as AbstractControl;
  }

  get type(): AbstractControl {
    return this.form.get('type') as AbstractControl;
  }

  get featured(): AbstractControl {
    return this.form.get('featured') as AbstractControl;
  }

  public onCreatePlaylist(): void {
    if (this.form.invalid) {
      return;
    }
    const playlistType = this.type.value ? 'public' : 'private';
    this.homeFacade.dispatchCreatePlaylist(this.title.value, playlistType, this.featured.value);
  }

  public toPersian(text: any): string {
    return this.persianNumberService.toPersian(text);
  }
}
