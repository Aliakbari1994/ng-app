import {AfterViewInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";

import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {CurrentUser} from "../../../../shared/models/current-user/current-user.model";
import {HomeFacade} from "../../store/home.facade";
import {ValidatorsService} from "../../../../core/services/validators/validators.service";
import {UserService} from "../../../../core/http/user/user.service";
import {AuthenticationService} from "../../../../core/authentication/authentication.service";

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  buttonLoading$: Observable<boolean | null> = this.homeFacade.buttonLoading$.pipe(takeWhile(() => this.componentActive));
  currentUser: CurrentUser = {
    username: null,
    name: null,
    email: null,
    mobile: null,
    avatar: null,
    followers: null,
    followings: null,
    playlists: null,
  };
  formName = this.fb.group({
    name: ['', [Validators.minLength(3)]]
  });
  formUsername = this.fb.group({
    username: ['',
      [Validators.minLength(3), Validators.pattern('^[A-Za-z0-9]*$')],
      [this.validatorsService.availableUsernameField(this.userService)]
    ]
  });
  formPassword = this.fb.group({
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
  });
  formEmail = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ],
      [this.validatorsService.availableUsername(this.authenticationService)]
    ],
    code: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
  });
  formMobile = this.fb.group({
    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern('^(0098|\\+?98|0?)9\\d{9}$')
      ],
      [this.validatorsService.availableUsername(this.authenticationService)]
    ],
    code: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
  });

  constructor(
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private readonly seoSocialShareService: SeoSocialShareService
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.homeFacade.currentUser$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.currentUser = res;
        this.formName.patchValue({
          name: res.name
        })
        this.formUsername.patchValue({
          username: res.username
        })
      });
    });
  }

  ngAfterViewInit(): void {
    const seoData: SeoSocialShareData = {
      title: 'اسکنت مدیا - اطلاعات حساب کاربری',
      keywords: 'اطلاعات حساب کاربری',
      description: 'ویرایش اطلاعات حساب کاربری در وبسایت اسکنت مدیا',
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public removeAvatar(): void {
    this.homeFacade.dispatchRemoveAvatar().then(() => {
      // reload current user data
      this.homeFacade.dispatchCurrentUser();
    });
  }

  public onFileChanged($event: Event) {
    const selectedFile = ($event.target as HTMLInputElement).files![0] as File;
    const dimensions = '600 600';
    // upload image
    this.homeFacade.dispatchUploadImage(selectedFile, dimensions).then(() => {
      // update avatar
      this.zone.runOutsideAngular(() => {
        this.homeFacade.uploadImageName$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
          if (res) {
            this.homeFacade.dispatchUpdateAvatar(res).then(() => {
              // reload current user data
              this.homeFacade.dispatchCurrentUser();
            });
          }
        });
      });
    });
  }

  get name(): AbstractControl {
    return this.formName.get('name') as AbstractControl;
  }

  get username(): AbstractControl {
    return this.formUsername.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.formPassword.get('password') as AbstractControl;
  }

  get newPassword(): AbstractControl {
    return this.formPassword.get('newPassword') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.formEmail.get('email') as AbstractControl;
  }

  get emailCode(): AbstractControl {
    return this.formEmail.get('code') as AbstractControl;
  }

  get mobile(): AbstractControl {
    return this.formMobile.get('mobile') as AbstractControl;
  }

  get mobileCode(): AbstractControl {
    return this.formMobile.get('code') as AbstractControl;
  }

  public onUpdateName(): void {
    if (this.formName.invalid) {
      return;
    }
    this.homeFacade.dispatchUpdateName((this.name.value).trim())
  }

  public onUpdateUsername(): void {
    if (this.formUsername.invalid) {
      return;
    }
    this.homeFacade.dispatchUpdateUsername((this.username.value).trim())
  }

  public onUpdatePassword(): void {
    if (this.formPassword.invalid) {
      return;
    }
    this.homeFacade.dispatchUpdatePassword((this.password.value).trim(), (this.newPassword.value).trim())
  }

  public sendUpdateEmailCode(): void {
    this.homeFacade.dispatchSendUpdateEmailCode((this.email.value).trim())
  }

  public onUpdateEmail(): void {
    if (this.formEmail.invalid) {
      return;
    }
    this.homeFacade.dispatchUpdateEmail((this.email.value).trim(), (this.emailCode.value).trim()).then(() => {
      this.homeFacade.dispatchCurrentUser();
    });
  }

  public sendUpdateMobileCode(): void {
    this.homeFacade.dispatchSendUpdateMobileCode((this.mobile.value).trim())
  }

  public onUpdateMobile(): void {
    if (this.formMobile.invalid) {
      return;
    }
    this.homeFacade.dispatchUpdateMobile((this.mobile.value).trim(), (this.mobileCode.value).trim()).then(() => {
      this.homeFacade.dispatchCurrentUser();
    });
  }

  public onDeactivateAccount(): void {
    this.homeFacade.dispatchDeactivateAccount();
  }
}
