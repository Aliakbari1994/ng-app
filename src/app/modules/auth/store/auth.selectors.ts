import {createSelector, createFeatureSelector} from '@ngrx/store';

import {State, authFeatureKey} from './auth.reducer';

export const selectFeature = createFeatureSelector<State>(authFeatureKey);

// google recaptcha selectors
export const selectAuthRecaptcha = createSelector(selectFeature, (state: State) => state.recaptchaToken);
// auth selectors
export const selectAuthLoading = createSelector(selectFeature, (state: State) => state.loading);
export const selectAuthMessage = createSelector(selectFeature, (state: State) => state.message);
export const selectAuthError = createSelector(selectFeature, (state: State) => state.error);
// auth user data selectors
export const selectAuthUserEmail = createSelector(selectFeature, (state: State) => state.authUserData.email);
export const selectAuthUserMobile = createSelector(selectFeature, (state: State) => state.authUserData.mobile);
export const selectAuthUserPassword = createSelector(selectFeature, (state: State) => state.authUserData.password);
export const selectAuthUserCacheData = createSelector(selectFeature, (state: State) => state.authUserData.cacheData);
