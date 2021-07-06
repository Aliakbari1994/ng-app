import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  constructor(private http: HttpClient) {
  }

  public storePlay(playable: string, slugId: string): Observable<any> {
    const body = {
      "slug_id": slugId,
      "playable": playable
    }
    return this.http.post(`${environment.apiUrl}/play`, body);
  }

  public playTrack(slugId: string): Observable<any> {
    const body = {
      "slug_id": slugId
    }
    return this.http.post(`${environment.apiUrl}/play/track`, body);
  }

  public playAlbum(slugId: string): Observable<any> {
    const body = {
      "slug_id": slugId
    }
    return this.http.post(`${environment.apiUrl}/play/album`, body);
  }

  public playArtist(slugId: string): Observable<any> {
    const body = {
      "slug_id": slugId
    }
    return this.http.post(`${environment.apiUrl}/play/artist`, body);
  }

  public playEpisode(slugId: string): Observable<any> {
    const body = {
      "slug_id": slugId
    }
    return this.http.post(`${environment.apiUrl}/play/episode`, body);
  }

  public playPlaylist(slugId: string): Observable<any> {
    const body = {
      "slug_id": slugId
    }
    return this.http.post(`${environment.apiUrl}/play/playlist`, body);
  }
}
