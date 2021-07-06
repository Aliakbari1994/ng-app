import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  public genres(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/genre`);
  }

  public featured(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/genre/featured`);
  }
}
