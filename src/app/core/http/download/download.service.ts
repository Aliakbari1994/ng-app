import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {
  }

  public downloadTrack(slugId: string): Observable<any> {
    const body = {
      "slug_id": slugId
    }
    return this.http.post(`${environment.apiUrl}/download/track`, body);
  }

  public downloadEpisode(slugId: string): Observable<any> {
    const body = {
      "slug_id": slugId
    }
    return this.http.post(`${environment.apiUrl}/download/episode`, body);
  }
}
