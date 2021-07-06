import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  public show(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${slugId}`);
  }

  public tracks(artistSlugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${artistSlugId}/tracks`);
  }

  public allTracks(artistSlugId: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${artistSlugId}/tracks/all?page=${page}`);
  }

  public albums(artistSlugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${artistSlugId}/albums`);
  }

  public allAlbums(artistSlugId: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${artistSlugId}/albums/all?page=${page}`);
  }

  public popularPlaysTracks(artistSlugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${artistSlugId}/popular-plays`);
  }

  public popularDownloadsTracks(artistSlugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${artistSlugId}/popular-downloads`);
  }

  public popularRatesTracks(artistSlugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${artistSlugId}/popular-rates`);
  }

  public allMusics(artistSlug: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/artist/${artistSlug}/musics?page=${page}`);
  }
}
