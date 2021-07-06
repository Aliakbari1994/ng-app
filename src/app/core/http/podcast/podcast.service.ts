import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  constructor(private http: HttpClient) {
  }

  public show(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/podcast/${slugId}`);
  }

  public podcastEpisodes(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/podcast/episodes/${slugId}`);
  }

  public index(page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/podcast?page=${page}`);
  }

  public myPodcasts(page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/podcast/my-podcasts?page=${page}`);
  }

  public featured(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/podcast/featured`);
  }
}
