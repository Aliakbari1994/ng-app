import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  public index(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/slider`);
  }

  public featureBanner(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/featured`);
  }
}
