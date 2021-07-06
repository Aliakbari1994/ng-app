import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) {
  }

  public show(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/track/${slugId}`);
  }

  public related(model: string, slugId: string): Observable<any> {
    const body = {
      "slug_id" : slugId,
      "type" : model
    }
    return this.http.post(`${environment.apiUrl}/track/related`, body);
  }

  public charts(type: string = 'persian', duration: string = 'week', sortBy: string = 'play'): Observable<any> {
    return this.http.get(`${environment.apiUrl}/track/charts?type=${type}&duration=${duration}&sort_by=${sortBy}`);
  }

  public featured(type: string = 'persian', order: string = 'DESC', genre: string = '' ): Observable<any> {
    return this.http.get(`${environment.apiUrl}/track/featured?type=${type}&genre=${genre}&order=${order}`);
  }
}
