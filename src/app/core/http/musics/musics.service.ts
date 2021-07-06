import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MusicsService {

  constructor(private http: HttpClient) {
  }

  public musics(type: string, genre: string, filter: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/musics?type=${type}&genre=${genre}&order=DESC&filter=${filter}&page=${page}`);
  }
}
