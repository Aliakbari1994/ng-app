import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// guards and resolvers
import {NoAuthGuard} from "../../core/guards/no-auth/no-auth.guard";
import {CheckAuthResolver} from "../../core/resolvers/check-auth/check-auth.resolver";
// components
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {UserVerificationComponent} from "./pages/user-verification/user-verification.component";
import {PasswordRecoveryComponent} from "./pages/password-recovery/password-recovery.component";
import {PasswordResetComponent} from "./pages/password-reset/password-reset.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [NoAuthGuard],
    resolve: {
      auth: CheckAuthResolver
    },
    children: [
      {
        path: '',
        redirectTo: '/auth/sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'sign-up/verify',
        component: UserVerificationComponent,
      },
      {
        path: 'password-recovery',
        component: PasswordRecoveryComponent,
      },
      {
        path: 'password-recovery/reset',
        component: PasswordResetComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
