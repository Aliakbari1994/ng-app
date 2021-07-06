import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  public show(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/playlist/${slugId}`);
  }

  public playlistTracks(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/playlist/tracks/${slugId}`);
  }

  public categories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category`);
  }

  public featuredCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category/featured`);
  }

  public addTrack(trackSlugId: string, playlistId: string | number): Observable<any> {
    const body = {
      "playlist_id": playlistId,
      "track_slug_id": trackSlugId.toString()
    }
    return this.http.post(`${environment.apiUrl}/playlist/add-track-to-playlist`, body);
  }

  public addAlbum(albumSlugId: string, playlistId: string | number): Observable<any> {
    const body = {
      "playlist_id": playlistId,
      "album_slug_id": albumSlugId.toString()
    }
    return this.http.post(`${environment.apiUrl}/playlist/add-album-to-playlist`, body);
  }

  public removePlaylist(slugId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/playlist/${slugId}`);
  }

  public updatePlaylist(slugId: string, title: string, playlistType: string, featured: boolean): Observable<any> {
    const body = {
      title,
      "type": playlistType,
      featured
    }
    return this.http.put(`${environment.apiUrl}/playlist/${slugId}`, body);
  }

  public createPlaylist(title: string, playlistType: string, featured: boolean): Observable<any> {
    const body = {
      title,
      "type": playlistType,
      featured
    }
    return this.http.post(`${environment.apiUrl}/playlist`, body);
  }

  public removeTrack(trackSlugId: string, playlistId: string | number): Observable<any> {
    const body = {
      "playlist_id": playlistId,
      "track_slug_id": trackSlugId.toString()
    }
    return this.http.post(`${environment.apiUrl}/playlist/remove-track-from-playlist`, body);
  }

  public featured(takeNumber: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/playlist/featured/${takeNumber}`);
  }

  public getByCategory(categorySlug: string,  page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/playlist/category/${categorySlug}?page=${page}`);
  }

  public myPlaylists(page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/playlist?page=${page}`);
  }
}
