import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import {Observable} from "rxjs";
import {takeWhile} from "rxjs/operators";
import {AuthFacade} from "../../store/auth.facade";
import {GenerateRecaptchaCodeService} from "../../../../core/services/generate-recaptcha-code/generate-recaptcha-code.service";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  componentActive = true;
  message$: Observable<string | null> = this.authFacade.message$.pipe(takeWhile(() => this.componentActive));
  error$: Observable<string | null> = this.authFacade.error$.pipe(takeWhile(() => this.componentActive));
  loading$: Observable<boolean | null> = this.authFacade.loading$.pipe(takeWhile(() => this.componentActive));

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private authFacade: AuthFacade,
    private generateRecaptchaCode: GenerateRecaptchaCodeService,
  ) {
  }

  ngOnInit(): void {
    this.generateRecaptchaCode.generateRecaptcha();
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-color', '#ffffff');
    // show and hide password
    const passwordEl = this.elementRef.nativeElement.ownerDocument.querySelector('input[type="password"]');
    const iconEl = this.renderer.createElement('span');
    this.renderer.setAttribute(iconEl, 'class', 'icon form-show-password');
    if (passwordEl) {
      this.renderer.insertBefore(this.renderer.parentNode(passwordEl), iconEl, passwordEl.firstElementChild);
      this.renderer.listen(iconEl, 'click', () => {
        if (iconEl.classList.contains('form-show-password')) {
          this.renderer.removeClass(iconEl, 'form-show-password');
          this.renderer.addClass(iconEl, 'form-hidden-password');
          this.renderer.setAttribute(passwordEl, 'type', 'text');
        } else if (iconEl.classList.contains('form-hidden-password')) {
          this.renderer.removeClass(iconEl, 'form-hidden-password');
          this.renderer.addClass(iconEl, 'form-show-password');
          this.renderer.setAttribute(passwordEl, 'type', 'password');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
