import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {takeWhile} from "rxjs/operators";

import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {ValidatorsService} from "../../../../core/services/validators/validators.service";
import {AuthFacade} from "../../store/auth.facade";
import {AuthenticationService} from "../../../../core/authentication/authentication.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  recaptchaToken: string | null = null;
  email: string | null = null;
  mobile: string | null = null;
  googleAuthToken: string | null = null;
  form = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.pattern('^([_a-zA-Z0-9]+(\\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,5}))|^(0098|\\+?98|0?)9\\d{9}$')
      ],
      [this.validatorsService.availableUsername(this.authenticationService)]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
    agreeTerms: [
      false,
      [Validators.requiredTrue],
    ]
  });

  constructor(
    private validatorsService: ValidatorsService,
    private authFacade: AuthFacade,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private zone: NgZone,
    private readonly seoSocialShareService: SeoSocialShareService
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.socialiteLogin(this.googleAuthToken);
    this.zone.runOutsideAngular(() => {
      // google recaptcha
      this.authFacade.recaptcha$.pipe(takeWhile(() => this.componentActive)).subscribe(token => {
        this.recaptchaToken = token;
      });
    });
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
      'background-image', 'url("/assets/images/auth/signup2.png")'
    );
    const seoData: SeoSocialShareData = {
      title: 'اسکنت مدیا - عضویت',
      keywords: 'عضویت در اسکنت مدیا',
      description: 'عضویت در اسکنت مدیا و دسترسی به آرشیو بی نظیر موسیقی',
    };
    this.seoSocialShareService.setData(seoData);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  get username(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
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
    this.authFacade.dispatchSignUp(this.email, this.mobile, (this.password.value).trim(), this.recaptchaToken);
  }
}
