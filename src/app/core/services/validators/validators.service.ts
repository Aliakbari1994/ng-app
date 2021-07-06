import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {of} from "rxjs";
import {map} from "rxjs/operators";

import {AuthenticationService} from "../../authentication/authentication.service";
import {UserService} from "../../http/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public availableUsername = (authenticationService: AuthenticationService) => (c: FormControl) => {
    if (!c || String(c.value).length === 0) {
      return of(null);
    }
    return authenticationService.checkAvailableUserName((String(c.value)).trim()).pipe(
      map(
        (res: any) => {
          if (res.data.available) {
            return null;
          }
          return {usernameAlreadyExists: true};
        }
      )
    );
  }

  public registeredUsername = (authenticationService: AuthenticationService) => (c: FormControl) => {
    if (!c || String(c.value).length === 0) {
      return of(null);
    }
    return authenticationService.checkAvailableUserName((String(c.value)).trim()).pipe(
      map(
        (res: any) => {
          if (!res.data.available) {
            return null;
          }
          return {userNotFound: true};
        }
      )
    );
  }

  public cannotContainSpace = (control: AbstractControl): ValidationErrors | null => {
    if ((control.value as string).indexOf(' ') >= 0) {
      return {cannotContainSpace: true};
    }
    return null;
  }

  public availableUsernameField = (userService: UserService) => (c: FormControl) => {
    if (!c || String(c.value).length === 0) {
      return of(null);
    }
    return userService.checkAvailableUserNameField((String(c.value)).trim()).pipe(
      map(
        (res: any) => {
          if (res.data.available) {
            return null;
          }
          return {usernameAlreadyExists: true};
        }
      )
    );
  }
}
