import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public search(query: string, filter: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/search?q=${query}&in=${filter}&page=${page}`);
  }
}
