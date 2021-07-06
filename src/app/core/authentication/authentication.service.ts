import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {CheckPlatformService} from "../services/check-platform/check-platform.service";
import {SignIn} from "../../shared/models/sign-in/sign-in.model";
import {SignUp} from "../../shared/models/sign-up/sign-up.model";
import {Verification} from "../../shared/models/verification/verification.model";
import {RecoveryPassword} from "../../shared/models/recovery-password/recovery-password.model";
import {ResetPassword} from "../../shared/models/reset-password/reset-password.model";
import {ResendRecoveryPasswordCode} from "../../shared/models/resend-recovery-password-code/resend-recovery-password-code.model";
import {ResendUserVerificationCode} from "../../shared/models/resend-user-verification-code/resend-user-verification-code.model";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private checkPlatformService: CheckPlatformService
  ) {
  }

  public getToken(): string {
    if (this.checkPlatformService.isBrowser) {
      return localStorage.getItem('token') as string;
    }
    return 'You Are In Server!';
  }

  public checkAvailableUserName(username: string): Observable<any> {
    const body = {
      username,
    };
    return this.http.post(`${environment.apiUrl}/check-username`, body);
  }

  public isLoggedIn(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/check-auth`);
  }

  public socialiteLogin(token: string | null): void {
    if (this.route.snapshot.queryParams.token) {
      token = this.route.snapshot.queryParams.token;
      if (this.checkPlatformService.isBrowser) {
        localStorage.setItem('token', 'Bearer ' + token);
      }
      this.router.navigate(['/']).then(r => r);
    }
  }

  public signIn(signIn: SignIn): Observable<any> {
    const body = {
      username: signIn.username,
      password: signIn.password,
      grant_type: environment.grant_type,
      client_id: environment.client_id,
      client_secret: environment.client_secret
    };
    return this.http.post(`${environment.apiUrl}/auth/sign-in`, body);
  }

  public signUp(signUp: SignUp): Observable<any> {
    const body = {
      email: signUp.email,
      mobile: signUp.mobile,
      password: signUp.password,
      password_confirmation: signUp.password,
      'g-recaptcha-response': signUp.gRecaptchaResponse,
    };
    return this.http.post(`${environment.apiUrl}/sign-up`, body);
  }

  public verification(verification: Verification): Observable<any> {
    const body = {
      username: verification.username,
      code: verification.code,
      'g-recaptcha-response': verification.gRecaptchaResponse,
    };
    return this.http.post(`${environment.apiUrl}/sign-up/verify`, body);
  }

  public resendUserVerificationCode(resendUserVerificationCode: ResendUserVerificationCode): Observable<any> {
    const body = {
      email: resendUserVerificationCode.email,
      mobile: resendUserVerificationCode.mobile,
      password: resendUserVerificationCode.password,
      password_confirmation: resendUserVerificationCode.password,
      'g-recaptcha-response': resendUserVerificationCode.gRecaptchaResponse,
    };
    return this.http.post(`${environment.apiUrl}/sign-up`, body);
  }

  public recoveryPassword(recoveryPassword: RecoveryPassword): Observable<any> {
    const body = {
      email: recoveryPassword.email,
      mobile: recoveryPassword.mobile,
      'g-recaptcha-response': recoveryPassword.gRecaptchaResponse
    };
    return this.http.post(`${environment.apiUrl}/recovery-password`, body);
  }

  public resetPassword(resetPassword: ResetPassword): Observable<any> {
    const body = {
      email: resetPassword.email,
      mobile: resetPassword.mobile,
      code: resetPassword.code,
      password: resetPassword.password,
      password_confirmation: resetPassword.password,
      'g-recaptcha-response': resetPassword.gRecaptchaResponse
    };
    return this.http.put(`${environment.apiUrl}/reset-password`, body);
  }

  public resendRecoveryPasswordCode(resendRecoveryPasswordCode: ResendRecoveryPasswordCode): Observable<any> {
    const body = {
      email: resendRecoveryPasswordCode.email,
      mobile: resendRecoveryPasswordCode.mobile,
      'g-recaptcha-response': resendRecoveryPasswordCode.gRecaptchaResponse
    };
    return this.http.post(`${environment.apiUrl}/recovery-password`, body);
  }
}
