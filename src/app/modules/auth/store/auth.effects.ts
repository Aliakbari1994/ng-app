import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {catchError, concatMap, exhaustMap, map, tap} from "rxjs/operators";

import {AuthenticationService} from "../../../core/authentication/authentication.service";
import {CheckPlatformService} from "../../../core/services/check-platform/check-platform.service";
import * as AuthPageActions from './auth.actions';

@Injectable()
export class AuthEffects {

  signIn$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(AuthPageActions.signInTry),
      exhaustMap(action =>
        this.authenticationService.signIn(action.signIn).pipe(
          map(data => AuthPageActions.signInSuccess({
            ...data,
            message: 'ورود به پنل با موفقیت انجام شد.',
            signIn: {
              tokenType: data.token_type,
              accessToken: data.access_token,
            }
          })),
          tap(res => {
            if (this.checkPlatformService.isBrowser) {
              window.localStorage.setItem('token', res.signIn.tokenType + ' ' + res.signIn.accessToken as string);
            }
          }),
          tap(() => this.router.navigate(['/'])),
          catchError(() => of(AuthPageActions.signInError({error: 'ورود به پنل با خطا مواجه شد. مجدداً تلاش کنید.'})))
        )
      )
    )
  );

  signUp$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(AuthPageActions.signUpTry),
      concatMap(action =>
        this.authenticationService.signUp(action.signUp).pipe(
          map(data => AuthPageActions.signUpSuccess({
            message: 'کد احراز هویت کاربر ارسال شد.',
            signUp: {
              mobile: action.signUp.mobile,
              email: action.signUp.email,
              password: action.signUp.password,
              gRecaptchaResponse: action.signUp.gRecaptchaResponse,
            }
          })),
          tap(() => this.router.navigate(['/auth/sign-up/verify'])),
          catchError(() => of(AuthPageActions.signUpError({error: 'ثبت نام با خطا مواجه شد. مجدداً تلاش کنید.'}))),
        )
      )
    )
  );

  verification$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(AuthPageActions.verificationTry),
      concatMap(action =>
        this.authenticationService.verification(action.verification).pipe(
          map(data => AuthPageActions.verificationSuccess({
            message: 'ثبت نام با موفقیت انجام شد.',
          })),
          tap(() => this.router.navigate(['/auth/sign-in'])),
          catchError(() => of(AuthPageActions.verificationError({error: 'ثبت نام با خطا مواجه شد. مجددا تلاش کنید.'})))
        )
      )
    )
  );

  recoveryPassword$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(AuthPageActions.recoveryPasswordTry),
      concatMap(action =>
        this.authenticationService.recoveryPassword(action.recoveryPassword).pipe(
          map(data => AuthPageActions.recoveryPasswordSuccess({
            message: 'کد احراز هویت کاربر ارسال شد.',
            recoveryPassword: {
              email: action.recoveryPassword.email,
              mobile: action.recoveryPassword.mobile,
              gRecaptchaResponse: action.recoveryPassword.gRecaptchaResponse,
            },
          })),
          tap(() => this.router.navigate(['/auth/password-recovery/reset'])),
          catchError(() => of(AuthPageActions.recoveryPasswordError({error: 'بازیابی گذرواژه با خطا مواجه شد. مجددا تلاش کنید.'}))),
        )
      )
    )
  );

  resetPassword$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(AuthPageActions.resetPasswordTry),
      concatMap(action =>
        this.authenticationService.resetPassword(action.resetPassword).pipe(
          map(data => AuthPageActions.resetPasswordSuccess({
            message: 'تغییر گذرواژه با موفقیت انجام شد.',
          })),
          tap(() => this.router.navigate(['/auth/sign-in'])),
          catchError(() => of(AuthPageActions.verificationError({error: 'تغییر گذرواژه با خطا مواجه شد. مجددا تلاش کنید.'}))),
        )
      )
    )
  );

  resendUserVerificationCode$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(AuthPageActions.resendUserVerificationCodeTry),
      concatMap(action =>
        this.authenticationService.resendUserVerificationCode(action.resendUserVerificationCode).pipe(
          map(data => AuthPageActions.resendUserVerificationCodeSuccess({
            message: 'کد احراز هویت کاربر مجدداً ارسال شد.',
          })),
          catchError(() => of(AuthPageActions.resendUserVerificationCodeError({error: 'برای ارسال مجدد کد، چند دقیقه دیگر تلاش کنید.'}))),
        )
      )
    )
  );

  resendRecoveryPasswordCode$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(AuthPageActions.resendRecoveryPasswordCodeTry),
      concatMap(action =>
        this.authenticationService.recoveryPassword(action.resendRecoveryPasswordCode).pipe(
          map(data => AuthPageActions.resendRecoveryPasswordCodeSuccess({
            message: 'کد احراز هویت کاربر مجدداً ارسال شد.',
          })),
          catchError(() => of(AuthPageActions.resendRecoveryPasswordCodeError({error: 'برای ارسال مجدد کد، چند دقیقه دیگر تلاش کنید.'}))),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authenticationService: AuthenticationService,
    private checkPlatformService: CheckPlatformService
  ) {
  }
}
