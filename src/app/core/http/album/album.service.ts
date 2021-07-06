import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  public show(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/album/${slugId}`);
  }

  public albumTracks(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/album/tracks/${slugId}`);
  }

  public featured(type: string = 'persian', order: string = 'DESC', genre: string = '' ): Observable<any> {
    return this.http.get(`${environment.apiUrl}/album/featured?type=${type}&genre=${genre}&order=${order}`);
  }
}
