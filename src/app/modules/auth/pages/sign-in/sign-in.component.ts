import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';

import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {SeoSocialShareData, SeoSocialShareService} from "ngx-seo";
import {ValidatorsService} from "../../../../core/services/validators/validators.service";
import {AuthFacade} from "../../store/auth.facade";
import {AuthenticationService} from "../../../../core/authentication/authentication.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements AfterViewInit {

  form = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.pattern('^([_a-zA-Z0-9]+(\\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,5}))|^(0098|\\+?98|0?)9\\d{9}$')
      ],
      [this.validatorsService.registeredUsername(this.authenticationService)]
    ],
    password: [
      '',
      [Validators.required],
      []
    ],
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private authenticationService: AuthenticationService,
    private authFacade: AuthFacade,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private readonly seoSocialShareService: SeoSocialShareService,
  ) {
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
      'background-image', 'url("/assets/images/auth/signin.png")'
    );
    const seoData: SeoSocialShareData = {
      title: 'اسکنت مدیا - ورود',
      keywords: 'ورود به پنل کاربری',
      description: 'ورود به پنل کاربری در وبسایت اسکنت مدیا',
    };
    this.seoSocialShareService.setData(seoData);
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
    this.authFacade.dispatchSignIn((this.username.value).trim(), (this.password.value).trim());
  }

}
