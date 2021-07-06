import {createAction, props} from '@ngrx/store';

import {SignIn} from "../../../shared/models/sign-in/sign-in.model";
import {SignUp} from "../../../shared/models/sign-up/sign-up.model";
import {Verification} from "../../../shared/models/verification/verification.model";
import {RecoveryPassword} from "../../../shared/models/recovery-password/recovery-password.model";
import {ResetPassword} from "../../../shared/models/reset-password/reset-password.model";
import {ResendRecoveryPasswordCode} from "../../../shared/models/resend-recovery-password-code/resend-recovery-password-code.model";
import {ResendUserVerificationCode} from "../../../shared/models/resend-user-verification-code/resend-user-verification-code.model";

// google recaptcha actions
export const recaptchaTry = createAction(
  '[Google Recaptcha] Try Recaptcha',
  props<{ recaptchaToken: string | null }>()
);

// sign-in actions
export const signInTry = createAction(
  '[SignIn Page] Try Sign In',
  props<{ signIn: SignIn }>()
);
export const signInSuccess = createAction(
  '[SignIn Page] Sign In Successful',
  props<{ signIn: SignIn, message: string | null }>()
);
export const signInError = createAction(
  '[SignIn Page] Sign In Error',
  props<{ error: string | null }>()
);

// sign-up actions
export const signUpTry = createAction(
  '[SignUp Page] Try Sign Up',
  props<{ signUp: SignUp }>()
);
export const signUpSuccess = createAction(
  '[SignUp Page] Sign Up Successful',
  props<{ signUp: SignUp, message: string }>()
);
export const signUpError = createAction(
  '[SignUp Page] Sign Up Error',
  props<{ error: string }>()
);

// verification actions
export const verificationTry = createAction(
  '[Verify Page] Try Verification',
  props<{ verification: Verification }>()
);
export const verificationSuccess = createAction(
  '[Verify Page] Verification Successful',
  props<{ message: string }>()
);
export const verificationError = createAction(
  '[Verify Page] Verification Error',
  props<{ error: string }>()
);

// recovery password actions
export const recoveryPasswordTry = createAction(
  '[Recovery Password Page] Try Recovery Password',
  props<{ recoveryPassword: RecoveryPassword }>()
);
export const recoveryPasswordSuccess = createAction(
  '[Recovery Password Page] Recovery Password Successful',
  props<{ recoveryPassword: RecoveryPassword, message: string }>()
);
export const recoveryPasswordError = createAction(
  '[Recovery Password Page] Recovery Password Error',
  props<{ error: string }>()
);

// password reset
export const resetPasswordTry = createAction(
  '[Reset Password Page] Try Reset Password',
  props<{ resetPassword: ResetPassword }>()
);
export const resetPasswordSuccess = createAction(
  '[Reset Password Page] Reset Password Successful',
  props<{ message: string }>()
);
export const resetPasswordError = createAction(
  '[Reset Password Page] Reset Password Error',
  props<{ error: string }>()
);

// resend user verification code
export const resendUserVerificationCodeTry = createAction(
  '[Resend User Verification Code Page] Try Resend User Verification Code',
  props<{ resendUserVerificationCode: ResendUserVerificationCode }>()
);
export const resendUserVerificationCodeSuccess = createAction(
  '[Resend User Verification Code Page] Resend User Verification Code Successful',
  props<{ message: string }>()
);
export const resendUserVerificationCodeError = createAction(
  '[Resend User Verification Code Page] Resend User Verification Code Error',
  props<{ error: string }>()
);

// resend code password
export const resendRecoveryPasswordCodeTry = createAction(
  '[Resend Recovery Password Code Page] Try Resend Recovery Password Code',
  props<{ resendRecoveryPasswordCode: ResendRecoveryPasswordCode }>()
);
export const resendRecoveryPasswordCodeSuccess = createAction(
  '[Resend Recovery Password Code Page] Resend Recovery Password Code Successful',
  props<{ message: string }>()
);
export const resendRecoveryPasswordCodeError = createAction(
  '[Resend Recovery Password Code Page] Resend Recovery Password Code Error',
  props<{ error: string }>()
);
