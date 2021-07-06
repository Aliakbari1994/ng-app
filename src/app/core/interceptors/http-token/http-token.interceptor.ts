import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthenticationService} from "../../authentication/authentication.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authenticationService.getToken();
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', authToken ? authToken : '');
    const req = request.clone({
      headers,
    });
    return next.handle(req);
  }
}
