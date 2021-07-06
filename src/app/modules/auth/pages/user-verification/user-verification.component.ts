import {AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {takeWhile} from "rxjs/operators";

import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {AuthFacade} from "../../store/auth.facade";
import {ReCaptchaV3Service} from "ngx-captcha";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {GenerateRecaptchaCodeService} from "../../../../core/services/generate-recaptcha-code/generate-recaptcha-code.service";

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit, AfterViewInit {

  componentActive = true;
  cacheData: boolean = false;
  mobile: string | null = null;
  email: string | null = null;
  username: string | null = null;
  password: string | null = null;
  recaptchaToken: string | null = null;
  form = this.fb.group({
    code: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ],
    ],
  });

  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private zone: NgZone,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private checkPlatformService: CheckPlatformService,
    private readonly seoSocialShareService: SeoSocialShareService,
    private generateRecaptchaCode: GenerateRecaptchaCodeService,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      // subscribes
      this.authFacade.recaptcha$.pipe(takeWhile(() => this.componentActive)).subscribe(token => {
        this.recaptchaToken = token;
      });
      this.authFacade.authUserCacheData$.pipe(takeWhile(() => this.componentActive)).subscribe(
        cacheData => this.cacheData = cacheData
      );
      this.authFacade.authUserMobile$.pipe(takeWhile(() => this.componentActive)).subscribe(
        mobile => this.mobile = mobile
      );
      this.authFacade.authUserEmail$.pipe(takeWhile(() => this.componentActive)).subscribe(
        email => this.email = email
      );
      this.authFacade.authUserPassword$.pipe(takeWhile(() => this.componentActive)).subscribe(
        password => this.password = password
      );
    });
    if (!this.cacheData) {
      this.router.navigate(['/auth/sign-up']).then(r => r);
    }
    this.username = this.mobile?.match('^(0098|\\+?98|0?)9\\d{9}$') ? this.mobile : this.email;
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement.ownerDocument.querySelector('.auth-sidebar'),
      'background', '#f2d184'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement.ownerDocument.querySelector('.auth-sidebar'),
      'color', '#866118'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement.ownerDocument.querySelector('.artwork-image'),
      'background-image', 'url("/assets/images/auth/verify.jpg")'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement.ownerDocument.querySelector('app-auth-social'),
      'display', 'none'
    );
    const seoData: SeoSocialShareData = {
      title: 'اسکنت مدیا - تایید ثبت نام',
      keywords: 'تایید ثبت نام کاربر',
      description: 'تایید ثبت نام کاربر در وبسایت اسکنت مدیا',
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  get code(): AbstractControl {
    return this.form.get('code') as AbstractControl;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.generateRecaptchaCode.generateRecaptcha();
    this.authFacade.dispatchVerification(this.username, (this.code.value).trim(), this.recaptchaToken);
  }

  public resendCode(): void {
    this.generateRecaptchaCode.generateRecaptcha();
    this.authFacade.dispatchResendUserVerificationCode(this.email, this.mobile, this.password, this.recaptchaToken);
  }
}
