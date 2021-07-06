import {Action, createReducer, on} from '@ngrx/store';

import * as AuthPageActions from './auth.actions';
import * as fromRoot from '../../../app.state';
// models
import {AuthUserData} from "../../../shared/models/auth-user-data/auth-user-data.model";

export const authFeatureKey = 'authentication';

export interface State extends fromRoot.State {
  recaptchaToken: string | null;
  loading: boolean;
  message: string | null;
  error: string | null;
  authUserData: AuthUserData;
}

export const initialState: State = {
  recaptchaToken: null,
  loading: false,
  message: null,
  error: null,
  authUserData: {
    email: null,
    mobile: null,
    password: null,
    cacheData: false,
  },
}

const authReducer = createReducer(initialState,
  // google recaptcha
  on(AuthPageActions.recaptchaTry, ((state, {recaptchaToken}) => ({
      ...state,
      recaptchaToken,
      loading: false,
    })),
  ),
  // sign-in
  on(AuthPageActions.signInTry, ((state, {signIn}) => ({
      ...state,
      loading: true,
    }))
  ),
  on(AuthPageActions.signInSuccess, ((state, {signIn, message}) => ({
      ...state,
      message,
      error: null,
      loading: false,
    }))
  ),
  on(AuthPageActions.signInError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
      message: null
    }))
  ),
  // sign up
  on(AuthPageActions.signUpTry, ((state, {signUp}) => ({
      ...state,
      loading: true,
      authUserData: {
        email: null,
        mobile: null,
        password: null,
        cacheData: false,
      }
    }))
  ),
  on(AuthPageActions.signUpSuccess, ((state, {signUp, message}) => ({
      ...state,
      message,
      error: null,
      loading: false,
      authUserData: {
        mobile: signUp.mobile,
        email: signUp.email,
        password: signUp.password,
        cacheData: true
      }
    }))
  ),
  on(AuthPageActions.signUpError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
      message: null
    }))
  ),
  // verification
  on(AuthPageActions.verificationTry, ((state, {verification}) => ({
      ...state,
      loading: true,
    }))
  ),
  on(AuthPageActions.verificationSuccess, ((state, {message}) => ({
      ...state,
      message,
      error: null,
      loading: false,
      authUserData: {
        mobile: null,
        email: null,
        password: null,
        cacheData: false,
      }
    }))
  ),
  on(AuthPageActions.verificationError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
      message: null
    }))
  ),
  // recovery password
  on(AuthPageActions.recoveryPasswordTry, ((state, {recoveryPassword}) => ({
      ...state,
      loading: true,
      authUserData: {
        email: null,
        mobile: null,
        password: null,
        cacheData: false,
      }
    }))
  ),
  on(AuthPageActions.recoveryPasswordSuccess, ((state, {recoveryPassword, message}) => ({
      ...state,
      message,
      error: null,
      loading: false,
      authUserData: {
        email: recoveryPassword.email,
        mobile: recoveryPassword.mobile,
        cacheData: true,
        password: null,
      }
    }))
  ),
  on(AuthPageActions.recoveryPasswordError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
      message: null
    }))
  ),
  // reset password
  on(AuthPageActions.resetPasswordTry, ((state, {resetPassword}) => ({
      ...state,
      loading: true,
    }))
  ),
  on(AuthPageActions.resetPasswordSuccess, ((state, {message}) => ({
      ...state,
      message,
      error: null,
      loading: false,
      authUserData: {
        mobile: null,
        email: null,
        password: null,
        cacheData: false,
      }
    }))
  ),
  on(AuthPageActions.resetPasswordError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
      message: null
    }))
  ),
  // resend user verification code
  on(AuthPageActions.resendUserVerificationCodeTry, ((state, {resendUserVerificationCode}) => ({
      ...state,
      loading: true,
      message: null
    }))
  ),
  on(AuthPageActions.resendUserVerificationCodeSuccess, ((state, {message}) => ({
      ...state,
      message,
      error: null,
      loading: false,
    }))
  ),
  on(AuthPageActions.resendUserVerificationCodeError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
      message: null
    }))
  ),

  // resend password recovery code
  on(AuthPageActions.resendRecoveryPasswordCodeTry, ((state, {resendRecoveryPasswordCode}) => ({
      ...state,
      loading: true,
      message: null
    }))
  ),
  on(AuthPageActions.resendRecoveryPasswordCodeSuccess, ((state, {message}) => ({
      ...state,
      message,
      error: null,
      loading: false,
    }))
  ),
  on(AuthPageActions.resendRecoveryPasswordCodeError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
      message: null
    }))
  ),
);

export function reducer(state: State, action: Action): State {
  return authReducer(state, action) as State;
}
