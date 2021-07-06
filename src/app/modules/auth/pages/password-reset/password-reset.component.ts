import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {takeWhile} from "rxjs/operators";

import {ReCaptchaV3Service} from "ngx-captcha";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {AuthFacade} from "../../store/auth.facade";
import {CheckPlatformService} from "../../../../core/services/check-platform/check-platform.service";
import {GenerateRecaptchaCodeService} from "../../../../core/services/generate-recaptcha-code/generate-recaptcha-code.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  cacheData: boolean = false;
  mobile: string | null = null;
  email: string | null = null;
  recaptchaToken: string | null = null;
  form = this.fb.group({
    code: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
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
    });
    if (!this.cacheData) {
      this.router.navigate(['/auth/password-recovery']).then(r => r);
    }
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement.ownerDocument.querySelector('.auth-sidebar'),
      'background', '#f1cdd7'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement.ownerDocument.querySelector('.auth-sidebar'),
      'color', '#865c6c'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement.ownerDocument.querySelector('.artwork-image'),
      'background-image', 'url("/assets/images/auth/signin.jpg")'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement.ownerDocument.querySelector('app-auth-social'),
      'display', 'none'
    );
    const seoData: SeoSocialShareData = {
      title: 'اسکنت مدیا - تغییر گذرواژه',
      keywords: 'تغییر گذرواژه',
      description: 'تغییر گذرواژه پنل کاربری اسکنت مدیا',
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  get code(): AbstractControl {
    return this.form.get('code') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.generateRecaptchaCode.generateRecaptcha();
    this.authFacade.dispatchResetPassword(this.email, this.mobile, (this.code.value).trim(), (this.password.value).trim(), this.recaptchaToken);
  }

  public resendCode(): void {
    this.generateRecaptchaCode.generateRecaptcha();
    this.authFacade.dispatchResendRecoveryPasswordCode(this.email, this.mobile, this.recaptchaToken);
  }
}
