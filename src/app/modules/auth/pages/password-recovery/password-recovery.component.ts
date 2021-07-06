import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {takeWhile} from "rxjs/operators";

import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {AuthFacade} from "../../store/auth.facade";
import {ValidatorsService} from "../../../../core/services/validators/validators.service";
import {AuthenticationService} from "../../../../core/authentication/authentication.service";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  recaptchaToken: string | null = null;
  email: string | null = null;
  mobile: string | null = null;
  form = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.pattern('^([_a-zA-Z0-9]+(\\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,5}))|^(0098|\\+?98|0?)9\\d{9}$')
      ],
      [this.validatorsService.registeredUsername(this.authenticationService)]
    ],
  });

  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private authenticationService: AuthenticationService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private readonly seoSocialShareService: SeoSocialShareService,
    private zone: NgZone,
  ) {
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      // subscribes
      this.authFacade.recaptcha$.pipe(takeWhile(() => this.componentActive)).subscribe(token => {
        this.recaptchaToken = token;
      });
    });
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
      title: 'اسکنت مدیا - بازیابی گذرواژه',
      keywords: 'بازیابی گذرواژه',
      description: 'بازیابی گذرواژه در اسکنت مدیا',
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  get username(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    if (((this.username.value).trim()).match('^(0098|\\+?98|0?)9\\d{9}$')) {
      this.email = null;
      this.mobile = '+98' + (this.username.value).trim().substr(-10, 10);
    }
    if (((this.username.value).trim()).match('^([_a-zA-Z0-9]+(\\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,5}))')) {
      this.mobile = null;
      this.email = (this.username.value).toLowerCase().trim();
    }
    this.authFacade.dispatchRecoveryPassword(this.email, this.mobile, this.recaptchaToken);
  }
}
