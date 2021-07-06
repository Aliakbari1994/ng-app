import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

import {AuthenticationService} from "../../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CheckAuthResolver implements Resolve<boolean> {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticationService.isLoggedIn().pipe(
      map(res => {
        if (!res.data.isLoggedIn) {
          return true;
        }
        this.router.navigate(['/']).then(r => r);
        return false;
      }),
    );
  }
}
