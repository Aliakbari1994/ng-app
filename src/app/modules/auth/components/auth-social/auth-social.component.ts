import {Component} from '@angular/core';

import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-auth-social',
  templateUrl: './auth-social.component.html',
  styleUrls: ['./auth-social.component.scss']
})
export class AuthSocialComponent {
  socialiteUrl = `${environment.apiUrl}/auth/google`;
}
