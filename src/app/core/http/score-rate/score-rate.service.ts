import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScoreRateService {

  constructor(private http: HttpClient) { }

  public rateTrack(slugId: string, rate: number): Observable<any> {
    const body = {
      slug_id: slugId,
      rate: +rate
    }
    return this.http.post(`${environment.apiUrl}/rate/track`, body);
  }

  public rateAlbum(slugId: string, rate: number): Observable<any> {
    const body = {
      slug_id: slugId,
      rate: +rate
    }
    return this.http.post(`${environment.apiUrl}/rate/album`, body);
  }
}
