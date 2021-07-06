import {Injectable} from "@angular/core";

import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
// state
import * as AuthPageActions from './auth.actions';
import * as selectors from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  public readonly recaptcha$: Observable<string | null> = this.store.pipe(select(selectors.selectAuthRecaptcha));
  public readonly message$: Observable<string | null> = this.store.pipe(select(selectors.selectAuthMessage));
  public readonly error$: Observable<string | null> = this.store.pipe(select(selectors.selectAuthError));
  public readonly loading$: Observable<boolean> = this.store.pipe(select(selectors.selectAuthLoading));
  // sign-up
  public readonly authUserMobile$: Observable<string | null> = this.store.pipe(select(selectors.selectAuthUserMobile));
  public readonly authUserEmail$: Observable<string | null> = this.store.pipe(select(selectors.selectAuthUserEmail));
  public readonly authUserPassword$: Observable<string | null> = this.store.pipe(select(selectors.selectAuthUserPassword));
  public readonly authUserCacheData$: Observable<boolean> = this.store.pipe(select(selectors.selectAuthUserCacheData));

  constructor(private readonly store: Store) {
  }

  public dispatchRecaptcha(token: string): void {
    this.store.dispatch(AuthPageActions.recaptchaTry({recaptchaToken: token}));
  }

  public dispatchSignIn(username: string, password: string): void {
    this.store.dispatch(AuthPageActions.signInTry({signIn: {username, password}}));
  }

  public dispatchSignUp(email: string | null, mobile: string | null, password: string | null, gRecaptchaResponse: string | null): void {
    this.store.dispatch(AuthPageActions.signUpTry({signUp: {email, mobile, password, gRecaptchaResponse}}));
  }

  public dispatchVerification(username: string | null, code: string | null, gRecaptchaResponse: string | null): void {
    this.store.dispatch(AuthPageActions.verificationTry({verification: {username, code, gRecaptchaResponse}}));
  }

  public dispatchResendUserVerificationCode(email: string | null, mobile: string | null, password: string | null, gRecaptchaResponse: string | null): void {
    this.store.dispatch(AuthPageActions.resendUserVerificationCodeTry({
      resendUserVerificationCode: {
        email,
        mobile,
        password,
        gRecaptchaResponse
      }
    }));
  }

  public dispatchRecoveryPassword(email: string | null, mobile: string | null, gRecaptchaResponse: string | null): void {
    this.store.dispatch(AuthPageActions.recoveryPasswordTry({recoveryPassword: {email, mobile, gRecaptchaResponse}}));
  }

  public dispatchResetPassword(email: string | null, mobile: string | null, code: string | null, password: string | null, gRecaptchaResponse: string | null): void {
    this.store.dispatch(AuthPageActions.resetPasswordTry({
      resetPassword: {
        email,
        mobile,
        code,
        password,
        gRecaptchaResponse
      }
    }));
  }

  public dispatchResendRecoveryPasswordCode(email: string | null, mobile: string | null, gRecaptchaResponse: string | null): void {
    this.store.dispatch(AuthPageActions.resendRecoveryPasswordCodeTry({
      resendRecoveryPasswordCode: {
        email,
        mobile,
        gRecaptchaResponse
      }
    }));
  }
}
