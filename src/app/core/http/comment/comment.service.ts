import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  public storeComment(content: string, commentableType: string, commentableId: string): Observable<any> {
    const body = {
      "body": content,
      "commentable_type": commentableType,
      "commentable_id": commentableId
    }
    return this.http.post(`${environment.apiUrl}/comment`, body);
  }

  public comments(commentableType: string, commentableId: string, page: number = 1): Observable<any> {
    const body = {
      "commentable_type": commentableType,
      "commentable_id": commentableId
    }
    return this.http.post(`${environment.apiUrl}/comment/show?page=${page}`, body);
  }
}
