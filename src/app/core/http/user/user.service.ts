import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  // current user api
  public currentUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile/current-user`);
  }

  public uploadImage(selectedFile: File, dimensions: string): Observable<any> {
    let fd = new FormData();
    fd.append('thumbnail', selectedFile, selectedFile.name);
    fd.append('dimensions', dimensions);
    let header = new HttpHeaders();
    header.set('Content-Type', ' multipart/form-data');
    return this.http.post(`${environment.apiUrl}/upload/thumbnail`, fd, {headers: header});
  }

  public updateAvatar(imageName: string): Observable<any> {
    const body = {
      avatar: {
        local: "upload",
        disk: "ftp",
        width: 600,
        name: imageName
      }
    }
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    return this.http.put(`${environment.apiUrl}/profile/avatar`, body, {headers: header});
  }

  public removeAvatar(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/profile/avatar`);
  }

  public updateName(name: string): Observable<any> {
    const body = {
      name: name,
    };
    return this.http.put(`${environment.apiUrl}/profile/name`, body);
  }

  public checkAvailableUserNameField(username: string): Observable<any> {
    const body = {
      username,
    };
    return this.http.post(`${environment.apiUrl}/profile/check-username-field`, body);
  }

  public updateUsername(username: string): Observable<any> {
    const body = {
      username,
    };
    return this.http.put(`${environment.apiUrl}/profile/user-name`, body);
  }

  public updatePassword(password: string, newPassword: string): Observable<any> {
    const body = {
      password,
      'new_password': newPassword
    };
    return this.http.put(`${environment.apiUrl}/profile/password`, body);
  }

  public sendUpdateEmailCode(email: string): Observable<any> {
    const body = {
      email
    };
    return this.http.post(`${environment.apiUrl}/profile/email`, body);
  }

  public updateEmail(email: string, code: string): Observable<any> {
    const body = {
      email,
      code,
    };
    return this.http.put(`${environment.apiUrl}/profile/email`, body);
  }

  public sendUpdateMobileCode(mobile: string): Observable<any> {
    const body = {
      mobile
    };
    return this.http.post(`${environment.apiUrl}/profile/mobile`, body);
  }

  public updateMobile(mobile: string, code: string): Observable<any> {
    const body = {
      mobile,
      code,
    };
    return this.http.put(`${environment.apiUrl}/profile/mobile`, body);
  }

  public deactivateAccount(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/profile/deactivate-account`);
  }

  public signOut(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile/sign-out`);
  }

  // user
  public profilePage(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${username}`);
  }

  public followUser(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile/follow/user/${username}`);
  }

  public followArtist(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile/follow/artist/${slugId}`);
  }

  public followPodcast(slugId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile/follow/podcast/${slugId}`);
  }

  public profilePublicPlaylists(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${username}/playlists`);
  }

  public profileFollowers(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${username}/followers`);
  }

  public profileFollowings(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${username}/followings`);
  }

  public profileAllPublicPlaylists(username: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${username}/playlists/all?page=${page}`);
  }

  public profileAllFollowers(username: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${username}/followers/all?page=${page}`);
  }

  public profileAllFollowings(username: string, page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${username}/followings/all?page=${page}`);
  }

  public recentPlays(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile/recent-plays`);
  }

  public myMusic(page: number = 1): Observable<any> {
    return this.http.get(`${environment.apiUrl}/profile/my-music?page=${page}`);
  }

}
