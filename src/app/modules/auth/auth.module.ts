import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// modules
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthRoutingModule} from './auth-routing.module';
import {NgxCaptchaModule} from "ngx-captcha";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {SharedModule} from "../../shared/shared.module";
// interceptors
import {HttpTokenInterceptor} from "../../core/interceptors/http-token/http-token.interceptor";
// state
import * as fromAuth from './store/auth.reducer';
import {AuthEffects} from "./store/auth.effects";
// components
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {AuthNavbarComponent} from './components/auth-navbar/auth-navbar.component';
import {AuthFormHeaderComponent} from './components/auth-form-header/auth-form-header.component';
import {AuthSocialComponent} from './components/auth-social/auth-social.component';
import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {UserVerificationComponent} from './pages/user-verification/user-verification.component';
import {PasswordRecoveryComponent} from './pages/password-recovery/password-recovery.component';
import {PasswordResetComponent} from './pages/password-reset/password-reset.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    SignInComponent,
    AuthNavbarComponent,
    AuthFormHeaderComponent,
    AuthSocialComponent,
    AuthFormComponent,
    SignUpComponent,
    UserVerificationComponent,
    PasswordRecoveryComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    SharedModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
  ]
})
export class AuthModule {
}
