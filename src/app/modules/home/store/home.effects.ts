import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {catchError, concatMap, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";

import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as HomePageActions from './home.actions';
import * as fromDbConfig from '../../../configs/db-settings.config';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {UserService} from "../../../core/http/user/user.service";
import {CheckPlatformService} from "../../../core/services/check-platform/check-platform.service";
import {AuthenticationService} from "../../../core/authentication/authentication.service";
import {TrackService} from "../../../core/http/track/track.service";
import {ArtistService} from "../../../core/http/artist/artist.service";
import {AlbumService} from "../../../core/http/album/album.service";
import {PodcastService} from "../../../core/http/podcast/podcast.service";
import {PlaylistService} from "../../../core/http/playlist/playlist.service";
import {GenreService} from "../../../core/http/genre/genre.service";
import {ScoreRateService} from "../../../core/http/score-rate/score-rate.service";
import {PlayService} from "../../../core/http/play/play.service";
import {DownloadService} from "../../../core/http/download/download.service";
import {CommentService} from "../../../core/http/comment/comment.service";
import {MusicsService} from "../../../core/http/musics/musics.service";
import {SliderService} from "../../../core/http/slider/slider.service";
import {SearchService} from "../../../core/http/search/search.service";

@Injectable()
export class HomeEffects {

  checkAuth$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.checkAuthTry),
      concatMap(action =>
        this.authenticationService.isLoggedIn().pipe(
          map(data => HomePageActions.checkAuthSuccess({
            isLoggedIn: data.data.isLoggedIn
          })),
          catchError(() => of(HomePageActions.checkAuthError)),
        )
      )
    )
  );

  uploadImage$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.uploadImageTry),
      concatMap(action =>
        this.userService.uploadImage(action.file, action.dimensions).pipe(
          map(data => HomePageActions.uploadImageSuccess({
            message: 'تصویر با موفقیت آپلود شد.',
            uploadImageName: data.data[0][Object.keys(data.data[0])[0]].name
          })),
          catchError(() => of(HomePageActions.uploadImageError({error: 'آپلود تصویر با شکست مواجه شد.'}))),
        )
      )
    )
  );

  currentUser$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.currentUserTry),
      concatMap(action =>
        this.userService.currentUser().pipe(
          map(data => HomePageActions.currentUserSuccess({
            currentUser: {
              username: data.data.username,
              name: data.data.name,
              email: data.data.email,
              mobile: data.data.mobile,
              avatar: data.data.avatar,
              followers: data.data.followers,
              followings: data.data.followings,
              playlists: data.data.playlists,
            }
          })),
          catchError(() => of(HomePageActions.currentUserError)),
        )
      )
    )
  );

  updateUserAvatar$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.updateAvatarTry),
      concatMap(action =>
        this.userService.updateAvatar(action.imageName).pipe(
          map(data => HomePageActions.updateAvatarSuccess({
            message: 'تصویر کاربری با موفقیت بروز شد.'
          })),
          catchError(() => of(HomePageActions.updateAvatarError({error: 'بروزرسانی تصویر کاربری با شکست مواجه شد.'}))),
        )
      )
    )
  );

  removeUserAvatar$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.removeAvatarTry),
      concatMap(action =>
        this.userService.removeAvatar().pipe(
          map(data => HomePageActions.removeAvatarSuccess({
            message: 'تصویر کاربری با موفقیت حذف شد.'
          })),
          catchError(() => of(HomePageActions.removeAvatarError({error: 'حذف تصویر کاربری با شکست مواجه شد.'}))),
        )
      )
    )
  );

  updateName$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.updateNameTry),
      concatMap(action =>
        this.userService.updateName(action.name).pipe(
          map(data => HomePageActions.updateNameSuccess({
            message: 'نام با موفقیت بروزرسانی شد.',
          })),
          catchError(() => of(HomePageActions.updateNameError({error: 'بروزرسانی نام با شکست مواجه شد.'}))),
        )
      )
    )
  );

  updateUsername$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.updateUsernameTry),
      concatMap(action =>
        this.userService.updateUsername(action.username).pipe(
          map(data => HomePageActions.updateUsernameSuccess({
            message: 'نام کاربری با موفقیت بروزرسانی شد.',
          })),
          catchError(() => of(HomePageActions.updateUsernameError({error: 'بروزرسانی نام کاربری با شکست مواجه شد.'}))),
        )
      )
    )
  );

  updatePassword$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.updatePasswordTry),
      concatMap(action =>
        this.userService.updatePassword(action.password, action.newPassword).pipe(
          map(data => HomePageActions.updatePasswordSuccess({
            message: 'گذرواژه با موفقیت بروزرسانی شد.',
          })),
          catchError(() => of(HomePageActions.updatePasswordError({error: 'بروزرسانی گذرواژه با شکست مواجه شد.'}))),
        )
      )
    )
  );

  sendUpdateEmailCode$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.sendUpdateEmailCodeTry),
      concatMap(action =>
        this.userService.sendUpdateEmailCode(action.email).pipe(
          map(data => HomePageActions.sendUpdateEmailCodeSuccess({
            message: 'کد احرازهویت با موفقیت ارسال شد.',
          })),
          catchError(() => of(HomePageActions.sendUpdateEmailCodeError({error: 'ارسال کد با شکست مواجه شد.'}))),
        )
      )
    )
  );

  updateEmail$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.updateEmailTry),
      concatMap(action =>
        this.userService.updateEmail(action.email, action.code).pipe(
          map(data => HomePageActions.updateEmailSuccess({
            message: 'ایمیل با موفقیت بروزرسانی شد.',
          })),
          catchError(() => of(HomePageActions.updateEmailError({error: 'بروزرسانی ایمیل با شکست مواجه شد.'}))),
        )
      )
    )
  );

  sendUpdateMobileCode$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.sendUpdateMobileCodeTry),
      concatMap(action =>
        this.userService.sendUpdateMobileCode(action.mobile).pipe(
          map(data => HomePageActions.sendUpdateMobileCodeSuccess({
            message: 'کد احرازهویت با موفقیت ارسال شد.',
          })),
          catchError(() => of(HomePageActions.sendUpdateMobileCodeError({error: 'ارسال کد با شکست مواجه شد.'}))),
        )
      )
    )
  );

  updateMobile$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.updateMobileTry),
      concatMap(action =>
        this.userService.updateMobile(action.mobile, action.code).pipe(
          map(data => HomePageActions.updateMobileSuccess({
            message: 'شماره موبایل با موفقیت بروزرسانی شد.',
          })),
          catchError(() => of(HomePageActions.updateMobileError({error: 'بروزرسانی شماره موبایل با شکست مواجه شد.'}))),
        )
      )
    )
  );

  deactivateAccount$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.deactivateAccountTry),
      concatMap(action =>
        this.userService.deactivateAccount().pipe(
          map(data => HomePageActions.deactivateAccountSuccess({
            message: 'حساب کاربری با موفقیت غیر فعال شد.',
          })),
          tap(() => this.router.navigate(['/'])),
          catchError(() => of(HomePageActions.deactivateAccountError({error: 'غیرفعالسازی حساب کاربری با شکست مواجه شد.'}))),
        )
      )
    )
  );

  signOut$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.signOutTry),
      concatMap(action =>
        this.userService.signOut().pipe(
          map(data => HomePageActions.signOutSuccess({
            message: 'شما با موفقیت از حساب کاربری خود خارج شدید.',
          })),
          tap(() => {
            if (this.checkPlatformService.isBrowser) {
              window.localStorage.removeItem('token');
              this.dbService.deleteDatabase();
            }
          }),
          tap(() => this.router.navigate(['/'])),
          catchError(() => of(HomePageActions.signOutError({error: 'خروج از حساب کاربری با شکست مواجه شد.'}))),
        )
      )
    )
  );

  profilePage$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profilePageTry),
      concatMap(action =>
        this.userService.profilePage(action.username).pipe(
          map(data => HomePageActions.profilePageSuccess({
            message: 'اطلاعات کاربر با موفقیت پیدا شد.',
            profileData: {
              userId: data.data.user_id,
              userAvatar: data.data.user_avatar,
              userName: data.data.user_name,
              followingsCount: data.data.followings_count,
              followersCount: data.data.followers_count,
              publicPlaylistsCount: data.data.public_playlists_count,
              followAction: data.data.follow_action
            }
          })),
          catchError(() => {
            of(HomePageActions.profilePageError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  profilePageRefresh$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profilePageRefreshTry),
      concatMap(action =>
        this.userService.profilePage(action.username).pipe(
          map(data => HomePageActions.profilePageRefreshSuccess({
            message: 'اطلاعات کاربر با موفقیت پیدا شد.',
            profileData: {
              userId: data.data.user_id,
              userAvatar: data.data.user_avatar,
              userName: data.data.user_name,
              followingsCount: data.data.followings_count,
              followersCount: data.data.followers_count,
              publicPlaylistsCount: data.data.public_playlists_count,
              followAction: data.data.follow_action
            }
          })),
          catchError(() => {
            of(HomePageActions.profilePageRefreshError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  followUserAction$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.followUserActionTry),
      concatMap(action =>
        this.userService.followUser(action.username).pipe(
          map(data => HomePageActions.followUserActionSuccess()),
          catchError(() => of(HomePageActions.followUserActionError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  track$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.trackTry),
      concatMap(action =>
        this.trackService.show(action.slugId).pipe(
          map(data => HomePageActions.trackSuccess({
            message: 'قطعه مورد نظر پیدا شد.',
            track: {
              thumbnail: data.data.thumbnail,
              titleFa: data.data.title_fa,
              titleEn: data.data.title_en,
              trackRate: data.data.track_rate,
              userRate: data.data.user_rate,
              countVoters: data.data.count_voters,
              explicit: data.data.explicit,
              ownerArtists: data.data.owner_artists,
              featArtists: data.data.feat_artists,
              publicationYear: data.data.publication_year,
              type: data.data.type,
              duration: data.data.duration,
              plays: data.data.plays,
              downloads: data.data.downloads,
              genres: data.data.genres,
              slug: data.data.slug,
              slugId: data.data.slugId,
              video: data.data.video,
              accessibility: data.data.accessibility,
              support: data.data.support,
              publishedAt: data.data.published_at,
              timeNow: data.data.time_now,
              musicArtists: data.data.music_artists,
              singerArtists: data.data.singer_artists,
              instrumentalistArtists: data.data.instrumentalist_artists,
              lyricistArtists: data.data.lyricist_artists,
              arrangementArtists: data.data.arrangement_artists,
              mixMasterArtists: data.data.mix_master_artists,
              lyrics: data.data.lyrics,
              keywords: data.data.keywords,
              description: data.data.description,
            }
          })),
          catchError(() => {
            of(HomePageActions.trackError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  artist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistTry),
      concatMap(action =>
        this.artistService.show(action.slugId).pipe(
          map(data => HomePageActions.artistSuccess({
            message: 'هنرمند مورد نظر پیدا شد.',
            artist: {
              thumbnail: data.data.thumbnail,
              nameFa: data.data.name_fa,
              nameEn: data.data.name_en,
              type: data.data.type,
              tracksCount: data.data.tracks_count,
              followersCount: data.data.followers_count,
              plays: data.data.plays,
              downloads: data.data.downloads,
              genres: data.data.genres,
              slugId: data.data.slugId,
              keywords: data.data.keywords,
              description: data.data.description,
              followAction: data.data.follow_action,
            }
          })),
          catchError(() => {
            of(HomePageActions.artistError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  artistRefresh$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistRefreshTry),
      concatMap(action =>
        this.artistService.show(action.slugId).pipe(
          map(data => HomePageActions.artistRefreshSuccess({
            message: 'هنرمند مورد نظر پیدا شد.',
            artist: {
              thumbnail: data.data.thumbnail,
              nameFa: data.data.name_fa,
              nameEn: data.data.name_en,
              type: data.data.type,
              tracksCount: data.data.tracks_count,
              followersCount: data.data.followers_count,
              plays: data.data.plays,
              downloads: data.data.downloads,
              genres: data.data.genres,
              slugId: data.data.slugId,
              keywords: data.data.keywords,
              description: data.data.description,
              followAction: data.data.follow_action,
            }
          })),
          catchError(() => {
            of(HomePageActions.artistRefreshError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  followArtistAction$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.followArtistActionTry),
      concatMap(action =>
        this.userService.followArtist(action.slugId).pipe(
          map(data => HomePageActions.followArtistActionSuccess()),
          catchError(() => of(HomePageActions.followArtistActionError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  album$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.albumTry),
      concatMap(action =>
        this.albumService.show(action.slugId).pipe(
          map(data => HomePageActions.albumSuccess({
            message: 'آلبوم مورد نظر پیدا شد.',
            album: {
              thumbnail: data.data.thumbnail,
              titleFa: data.data.title_fa,
              titleEn: data.data.title_en,
              albumRate: data.data.album_rate,
              userRate: data.data.user_rate,
              countVoters: data.data.count_voters,
              explicit: data.data.explicit,
              ownerArtists: data.data.owner_artists,
              featArtists: data.data.feat_artists,
              publicationYear: data.data.publication_year,
              type: data.data.type,
              duration: data.data.duration,
              genres: data.data.genres,
              slugId: data.data.slugId,
              slug: data.data.slug,
              accessibility: data.data.accessibility,
              support: data.data.support,
              publishedAt: data.data.published_at,
              timeNow: data.data.time_now,
              keywords: data.data.keywords,
              description: data.data.description,
            }
          })),
          catchError(() => {
            of(HomePageActions.albumError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  albumTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.albumTracksTry),
      concatMap(action =>
        this.albumService.albumTracks(action.slugId).pipe(
          map(data => HomePageActions.albumTracksSuccess({
            message: 'قطعات آلبوم مورد نظر پیدا شد.',
            albumTracks: {
              tracks: data.data
            }
          })),
          catchError(() => of(HomePageActions.albumTracksError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  podcast$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.podcastTry),
      concatMap(action =>
        this.podcastService.show(action.slugId).pipe(
          map(data => HomePageActions.podcastSuccess({
            message: 'پادکست مورد نظر پیدا شد.',
            podcast: {
              thumbnail: data.data.thumbnail,
              titleFa: data.data.title_fa,
              titleEn: data.data.title_en,
              owner: data.data.owner,
              info: data.data.info,
              explicit: data.data.explicit,
              followersCount: data.data.followers_count,
              followAction: data.data.follow_action,
              slugId: data.data.slugId,
              accessibility: data.data.accessibility,
              support: data.data.support,
              keywords: data.data.keywords,
              description: data.data.description,
            }
          })),
          catchError(() => {
            of(HomePageActions.podcastError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  podcastRefresh$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.podcastRefreshTry),
      concatMap(action =>
        this.podcastService.show(action.slugId).pipe(
          map(data => HomePageActions.podcastRefreshSuccess({
            message: 'پادکست مورد نظر تازه سازی شد.',
            podcast: {
              thumbnail: data.data.thumbnail,
              titleFa: data.data.title_fa,
              titleEn: data.data.title_en,
              owner: data.data.owner,
              info: data.data.info,
              explicit: data.data.explicit,
              followersCount: data.data.followers_count,
              followAction: data.data.follow_action,
              slugId: data.data.slugId,
              accessibility: data.data.accessibility,
              support: data.data.support,
              keywords: data.data.keywords,
              description: data.data.description,
            }
          })),
          catchError(() => {
            of(HomePageActions.podcastRefreshError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  followPodcastAction$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.followPodcastActionTry),
      concatMap(action =>
        this.userService.followPodcast(action.slugId).pipe(
          map(data => HomePageActions.followPodcastActionSuccess()),
          catchError(() => of(HomePageActions.followPodcastActionError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  podcastEpisodes$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.podcastEpisodesTry),
      concatMap(action =>
        this.podcastService.podcastEpisodes(action.slugId).pipe(
          map(data => HomePageActions.podcastEpisodesSuccess({
            message: 'قسمت های پادکست مورد نظر پیدا شد.',
            podcastEpisodes: {
              episodes: data.data
            }
          })),
          catchError(() => of(HomePageActions.podcastEpisodesError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playlist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playlistTry),
      concatMap(action =>
        this.playlistService.show(action.slugId).pipe(
          map(data => HomePageActions.playlistSuccess({
            message: 'پلی لیست مورد نظر پیدا شد.',
            playlist: {
              thumbnail: data.data.thumbnail,
              title: data.data.title,
              creatorId: data.data.creator_id,
              creatorName: data.data.creator_name,
              tracksCount: data.data.tracks_count,
              duration: data.data.duration,
              buttonStatus: data.data.button_status,
              slugId: data.data.slug_id,
              type: data.data.type,
              featured: data.data.featured,
              keywords: data.data.keywords,
              description: data.data.description,
            }
          })),
          catchError(() => {
            of(HomePageActions.playlistError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))
            return this.router.navigate(['/404']);
          }),
        )
      )
    )
  );

  refreshPlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.refreshPlaylistTry),
      concatMap(action =>
        this.playlistService.show(action.slugId).pipe(
          map(data => HomePageActions.refreshPlaylistSuccess({
            message: 'پلی لیست مورد نظر پیدا شد.',
            playlist: {
              thumbnail: data.data.thumbnail,
              title: data.data.title,
              creatorId: data.data.creator_id,
              creatorName: data.data.creator_name,
              tracksCount: data.data.tracks_count,
              duration: data.data.duration,
              buttonStatus: data.data.button_status,
              slugId: data.data.slug_id,
              type: data.data.type,
              featured: data.data.featured,
              keywords: data.data.keywords,
              description: data.data.description,
            }
          })),
          catchError(() => of(HomePageActions.refreshPlaylistError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playlistTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playlistTracksTry),
      concatMap(action =>
        this.playlistService.playlistTracks(action.slugId).pipe(
          map(data => HomePageActions.playlistTracksSuccess({
            message: 'قطعات پلی لیست مورد نظر پیدا شد.',
            playlistTracks: {
              tracks: data.data
            }
          })),
          catchError(() => of(HomePageActions.playlistTracksError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  categories$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.categoriesTry),
      concatMap(action =>
        this.playlistService.categories().pipe(
          map(data => HomePageActions.categoriesSuccess({
            message: 'دسته بندی ها دریافت شد.',
            categories: {
              categories: data.data
            }
          })),
          catchError(() => of(HomePageActions.categoriesError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  genres$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.genresTry),
      concatMap(action =>
        this.genreService.genres().pipe(
          map(data => HomePageActions.genresSuccess({
            message: 'ژانر ها دریافت شد.',
            genres: {
              genres: data.data
            }
          })),
          catchError(() => of(HomePageActions.genresError({error: 'دریافت اطلاعات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  rateTrack$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.rateTrackTry),
      concatMap(action =>
        this.scoreRateService.rateTrack(action.slugId, +action.rate).pipe(
          map(data => HomePageActions.rateTrackSuccess({
            message: 'امتیاز شما با موفقیت ثبت شد.'
          })),
          catchError(() => of(HomePageActions.rateTrackError({error: 'ثبت امتیاز با خطا مواجه شد.'}))),
        )
      )
    )
  );

  rateAlbum$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.rateAlbumTry),
      concatMap(action =>
        this.scoreRateService.rateAlbum(action.slugId, +action.rate).pipe(
          map(data => HomePageActions.rateAlbumSuccess({
            message: 'امتیاز شما با موفقیت ثبت شد.'
          })),
          catchError(() => of(HomePageActions.rateAlbumError({error: 'ثبت امتیاز با خطا مواجه شد.'}))),
        )
      )
    )
  );

  addTrackToPlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.addTrackToPlaylistTry),
      concatMap(action =>
        this.playlistService.addTrack(action.trackSlugId, action.playlistId).pipe(
          map(data => HomePageActions.addTrackToPlaylistSuccess({
            message: 'قطعه با موفقیت به پلی لیست اضافه شد.'
          })),
          catchError(() => of(HomePageActions.addTrackToPlaylistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  storePlay$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.storePlayTry),
      concatMap(action =>
        this.playService.storePlay(action.playable, action.slugId).pipe(
          map(data => HomePageActions.storePlaySuccess({
            message: 'قطعه با موفقیت پخش شد.',
          })),
          catchError(() => of(HomePageActions.storePlayError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playTrack$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playTrackTry),
      concatMap(action =>
        this.playService.playTrack(action.slugId).pipe(
          map(data => HomePageActions.playTrackSuccess({
            message: 'قطعه با موفقیت به لیست پخش اضافه شد.',
            track: data.data
          })),
          tap((data) => {
            this.dbService.clear(fromDbConfig.homePlayerKey).subscribe((successDeleted) => {
              if (successDeleted) {
                this.dbService.add(fromDbConfig.homePlayerKey, data.track);
              }
            });
          }),
          catchError(() => of(HomePageActions.playTrackError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  addToNowPlayingTrack$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.addToNowPlayingTrackTry),
      concatMap(action =>
        this.playService.playTrack(action.slugId).pipe(
          map(data => HomePageActions.addToNowPlayingTrackSuccess({
            message: 'قطعه با موفقیت به لیست پخش اضافه شد.',
            track: data.data
          })),
          tap((data) => {
            this.dbService.add(fromDbConfig.homePlayerKey, data.track);
          }),
          catchError(() => of(HomePageActions.addToNowPlayingTrackError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  downloadTrack$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.downloadTrackTry),
      concatMap(action =>
        this.downloadService.downloadTrack(action.slugId).pipe(
          map(data => HomePageActions.downloadTrackSuccess({
            message: 'قطعه با موفقیت دانلود شد.',
            downloadUrl: data.data.url
          })),
          tap((action) => {
            if (this.checkPlatformService.isBrowser) {
              window.location.href = action.downloadUrl;
            }
          }),
          catchError(() => of(HomePageActions.downloadTrackError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  relatedTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.relatedTracksTry),
      concatMap(action =>
        this.trackService.related(action.model, action.slugId).pipe(
          map(data => HomePageActions.relatedTracksSuccess({
            message: 'قطعات مرتبط با موفقیت دریافت شدند.',
            relatedTracks: data.data
          })),
          catchError(() => of(HomePageActions.relatedTracksError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  storeComment$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.storeCommentTry),
      concatMap(action =>
        this.commentService.storeComment(action.content, action.commentableType, action.commentableId).pipe(
          map(data => HomePageActions.storeCommentSuccess({
            message: 'دیدگاه شما با موفقیت ثبت و پس از تأیید به نمایش در می آید.',
          })),
          catchError(() => of(HomePageActions.storeCommentError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  comments$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.commentsTry),
      concatMap(action =>
        this.commentService.comments(action.commentableType, action.commentableId, action.page).pipe(
          map(data => HomePageActions.commentsSuccess({
            message: 'دیدگاه ها با موفقیت دریافت شدند.',
            comments: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.commentsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playAlbum$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playAlbumTry),
      concatMap(action =>
        this.playService.playAlbum(action.slugId).pipe(
          map(data => HomePageActions.playAlbumSuccess({
            message: 'قطعات آلبوم با موفقیت به لیست پخش اضافه شد.',
            tracks: data.data
          })),
          tap((action) => {
            this.dbService
              .clear(fromDbConfig.homePlayerKey)
              .subscribe((successDeleted) => {
                if (successDeleted) {
                  action.tracks.forEach((item) => {
                    this.dbService.add(fromDbConfig.homePlayerKey, {
                      playable: item.playable,
                      slug: item.slug,
                      duration: item.duration,
                      name: item.name,
                      artist: item.artist,
                      url: item.url,
                      cover: item.cover,
                      type: item.type,
                    });
                  });
                }
              });
          }),
          catchError(() => of(HomePageActions.playAlbumError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  addToNowPlayingAlbum$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.addToNowPlayingAlbumTry),
      concatMap(action =>
        this.playService.playAlbum(action.slugId).pipe(
          map(data => HomePageActions.addToNowPlayingAlbumSuccess({
            message: 'قطعات با موفقیت به لیست پخش اضافه شد.',
            tracks: data.data
          })),
          tap((action) => {
            action.tracks.forEach((item: any) => {
              this.dbService.add(fromDbConfig.homePlayerKey, {
                playable: item.playable,
                slug: item.slug,
                duration: item.duration,
                name: item.name,
                artist: item.artist,
                url: item.url,
                cover: item.cover,
                type: item.type,
              });
            });
          }),
          catchError(() => of(HomePageActions.addToNowPlayingAlbumError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  addAlbumToPlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.addAlbumToPlaylistTry),
      concatMap(action =>
        this.playlistService.addAlbum(action.albumSlugId, action.playlistId).pipe(
          map(data => HomePageActions.addAlbumToPlaylistSuccess({
            message: 'قطعات آلبوم با موفقیت به پلی لیست اضافه شد.'
          })),
          catchError(() => of(HomePageActions.addAlbumToPlaylistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  downloadEpisode$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.downloadEpisodeTry),
      concatMap(action =>
        this.downloadService.downloadEpisode(action.slugId).pipe(
          map(data => HomePageActions.downloadEpisodeSuccess({
            message: 'قسمت پادکست با موفقیت دانلود شد.',
            downloadUrl: data.data.url
          })),
          tap((action) => {
            if (this.checkPlatformService.isBrowser) {
              window.location.href = action.downloadUrl;
            }
          }),
          catchError(() => of(HomePageActions.downloadEpisodeError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playEpisode$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playEpisodeTry),
      concatMap(action =>
        this.playService.playEpisode(action.slugId).pipe(
          map(data => HomePageActions.playEpisodeSuccess({
            message: 'قطعه با موفقیت به لیست پخش اضافه شد.',
            episode: data.data
          })),
          tap((data) => {
            this.dbService.clear(fromDbConfig.homePlayerKey).subscribe((successDeleted) => {
              if (successDeleted) {
                this.dbService.add(fromDbConfig.homePlayerKey, data.episode);
              }
            });
          }),
          catchError(() => of(HomePageActions.playEpisodeError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playPlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playPlaylistTry),
      concatMap(action =>
        this.playService.playPlaylist(action.slugId).pipe(
          map(data => HomePageActions.playPlaylistSuccess({
            message: 'قطعات با موفقیت به لیست پخش اضافه شد.',
            tracks: data.data
          })),
          tap((action) => {
            this.dbService
              .clear(fromDbConfig.homePlayerKey)
              .subscribe((successDeleted) => {
                if (successDeleted) {
                  action.tracks.forEach((item) => {
                    this.dbService.add(fromDbConfig.homePlayerKey, {
                      playable: item.playable,
                      slug: item.slug,
                      duration: item.duration,
                      name: item.name,
                      artist: item.artist,
                      url: item.url,
                      cover: item.cover,
                      type: item.type,
                    });
                  });
                }
              });
          }),
          catchError(() => of(HomePageActions.playPlaylistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  addToNowPlayingPlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.addToNowPlayingPlaylistTry),
      concatMap(action =>
        this.playService.playPlaylist(action.slugId).pipe(
          map(data => HomePageActions.addToNowPlayingPlaylistSuccess({
            message: 'قطعات با موفقیت به لیست پخش اضافه شد.',
            tracks: data.data
          })),
          tap((action) => {
            action.tracks.forEach((item: any) => {
              this.dbService.add(fromDbConfig.homePlayerKey, {
                playable: item.playable,
                slug: item.slug,
                duration: item.duration,
                name: item.name,
                artist: item.artist,
                url: item.url,
                cover: item.cover,
                type: item.type,
              });
            });
          }),
          catchError(() => of(HomePageActions.addToNowPlayingPlaylistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  removePlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.removePlaylistTry),
      concatMap(action =>
        this.playlistService.removePlaylist(action.slugId).pipe(
          map(data => HomePageActions.removePlaylistSuccess({
            message: 'پلی لیست با موفقیت حذف شد.',
          })),
          tap(() => {
            return this.router.navigate(['/browse'])
          }),
          catchError(() => of(HomePageActions.removePlaylistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  updatePlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.updatePlaylistTry),
      concatMap(action =>
        this.playlistService.updatePlaylist(action.slugId, action.title, action.playlistType, action.featured).pipe(
          map(data => HomePageActions.updatePlaylistSuccess({
            message: 'پلی لیست با موفقیت بروزرسانی شد.',
          })),
          catchError(() => of(HomePageActions.updatePlaylistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  createPlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.createPlaylistTry),
      concatMap(action =>
        this.playlistService.createPlaylist(action.title, action.playlistType, action.featured).pipe(
          map(data => HomePageActions.createPlaylistSuccess({
            message: 'پلی لیست با موفقیت ایجاد شد.',
          })),
          catchError(() => of(HomePageActions.createPlaylistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  removeTrackFromPlaylist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.removeTrackFromPlaylistTry),
      concatMap(action =>
        this.playlistService.removeTrack(action.trackSlugId, action.playlistId).pipe(
          map(data => HomePageActions.removeTrackFromPlaylistSuccess({
            message: 'قطعه با موفقیت از پلی لیست حذف شد.'
          })),
          catchError(() => of(HomePageActions.removeTrackFromPlaylistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  featuredPlaylists$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.featuredPlaylistsTry),
      concatMap(action =>
        this.playlistService.featured(action.takeNumber).pipe(
          map(data => HomePageActions.featuredPlaylistsSuccess({
            message: 'پلی لیست ها با موفقیت دریافت شدند.',
            playlists: data.data
          })),
          catchError(() => of(HomePageActions.featuredPlaylistsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playlistsByCategory$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playlistsByCategoryTry),
      concatMap(action =>
        this.playlistService.getByCategory(action.categorySlug, action.page).pipe(
          map(data => HomePageActions.playlistsByCategorySuccess({
            playlists: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.playlistsByCategoryError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playlistsByCategoryLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playlistsByCategoryLoadMoreTry),
      concatMap(action =>
        this.playlistService.getByCategory(action.categorySlug, action.page).pipe(
          map(data => HomePageActions.playlistsByCategoryLoadMoreSuccess({
            playlists: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.playlistsByCategoryLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profilePublicPlaylists$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profilePublicPlaylistsTry),
      concatMap(action =>
        this.userService.profilePublicPlaylists(action.username).pipe(
          map(data => HomePageActions.profilePublicPlaylistsSuccess({
            message: 'پلی لیست های عمومی با موفقیت دریافت شدند.',
            playlists: data.data
          })),
          catchError(() => of(HomePageActions.profilePublicPlaylistsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profileFollowers$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profileFollowersTry),
      concatMap(action =>
        this.userService.profileFollowers(action.username).pipe(
          map(data => HomePageActions.profileFollowersSuccess({
            message: 'لیست دنبال کنندگان با موفقیت دریافت شدند.',
            followers: data.data
          })),
          catchError(() => of(HomePageActions.profileFollowersError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profileFollowings$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profileFollowingsTry),
      concatMap(action =>
        this.userService.profileFollowings(action.username).pipe(
          map(data => HomePageActions.profileFollowingsSuccess({
            message: 'لیست دنبال شدگان با موفقیت دریافت شدند.',
            followings: data.data
          })),
          catchError(() => of(HomePageActions.profileFollowingsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profileAllPublicPlaylists$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profileAllPublicPlaylistsTry),
      concatMap(action =>
        this.userService.profileAllPublicPlaylists(action.username, action.page).pipe(
          map(data => HomePageActions.profileAllPublicPlaylistsSuccess({
            playlists: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.profileAllPublicPlaylistsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profileLoadMorePublicPlaylists$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profileLoadMorePublicPlaylistsTry),
      concatMap(action =>
        this.userService.profileAllPublicPlaylists(action.username, action.page).pipe(
          map(data => HomePageActions.profileLoadMorePublicPlaylistsSuccess({
            playlists: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.profileLoadMorePublicPlaylistsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profileAllFollowers$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profileAllFollowersTry),
      concatMap(action =>
        this.userService.profileAllFollowers(action.username, action.page).pipe(
          map(data => HomePageActions.profileAllFollowersSuccess({
            followers: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.profileAllFollowersError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profileLoadMoreAllFollowers$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profileLoadMoreAllFollowersTry),
      concatMap(action =>
        this.userService.profileAllFollowers(action.username, action.page).pipe(
          map(data => HomePageActions.profileLoadMoreAllFollowersSuccess({
            followers: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.profileLoadMoreAllFollowersError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profileAllFollowings$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profileAllFollowingsTry),
      concatMap(action =>
        this.userService.profileAllFollowings(action.username, action.page).pipe(
          map(data => HomePageActions.profileAllFollowingsSuccess({
            followings: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.profileAllFollowingsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  profileLoadMoreAllFollowings$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.profileLoadMoreAllFollowingsTry),
      concatMap(action =>
        this.userService.profileAllFollowings(action.username, action.page).pipe(
          map(data => HomePageActions.profileLoadMoreAllFollowingsSuccess({
            followings: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.profileLoadMoreAllFollowingsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  podcasts$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.podcastsTry),
      concatMap(action =>
        this.podcastService.index(action.page).pipe(
          map(data => HomePageActions.podcastsSuccess({
            podcasts: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.podcastsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  podcastsLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.podcastsLoadMoreTry),
      concatMap(action =>
        this.podcastService.index(action.page).pipe(
          map(data => HomePageActions.podcastsLoadMoreSuccess({
            podcasts: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.podcastsLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  chartsTrack$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.chartsTrackTry),
      concatMap(action =>
        this.trackService.charts(action.trackType, action.duration, action.sortBy).pipe(
          map(data => HomePageActions.chartsTrackSuccess({
            message: 'Top tracks founded.',
            tracks: data.data,
          })),
          catchError(() => of(HomePageActions.chartsTrackError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  chartsTrackRefresh$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.chartsTrackRefreshTry),
      concatMap(action =>
        this.trackService.charts(action.trackType, action.duration, action.sortBy).pipe(
          map(data => HomePageActions.chartsTrackRefreshSuccess({
            message: 'Top tracks founded.',
            tracks: data.data,
          })),
          catchError(() => of(HomePageActions.chartsTrackRefreshError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  musics$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.musicsTry),
      concatMap(action =>
        this.musicsService.musics(action.musicType, action.genre, action.filter, action.page).pipe(
          map(data => HomePageActions.musicsSuccess({
            musics: data.data,
            pagination: {
              totalItems: data.meta ? data.meta.total : 0,
              currentPage: data.meta ? data.meta.current_page : data.current_page,
              pageSize: data.meta ? data.meta.per_page : data.per_page,
            },
          })),
          catchError(() => of(HomePageActions.musicsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  musicsRefresh$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.musicsRefreshTry),
      concatMap(action =>
        this.musicsService.musics(action.musicType, action.genre, action.filter, action.page).pipe(
          map(data => HomePageActions.musicsRefreshSuccess({
            musics: data.data,
            pagination: {
              totalItems: data.meta ? data.meta.total : 0,
              currentPage: data.meta ? data.meta.current_page : data.current_page,
              pageSize: data.meta ? data.meta.per_page : data.per_page,
            },
          })),
          catchError(() => of(HomePageActions.musicsRefreshError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  musicsLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.musicsLoadMoreTry),
      concatMap(action =>
        this.musicsService.musics(action.musicType, action.genre, action.filter, action.page).pipe(
          map(data => HomePageActions.musicsLoadMoreSuccess({
            musics: data.data,
            pagination: {
              totalItems: data.meta ? data.meta.total : 0,
              currentPage: data.meta ? data.meta.current_page : data.current_page,
              pageSize: data.meta ? data.meta.per_page : data.per_page,
            },
          })),
          catchError(() => of(HomePageActions.musicsLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistTracksTry),
      concatMap(action =>
        this.artistService.tracks(action.artistSlugId).pipe(
          map(data => HomePageActions.artistTracksSuccess({
            message: 'قطعات هنرمند با موفقیت دریافت شدند.',
            tracks: data.data
          })),
          catchError(() => of(HomePageActions.artistTracksError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistAlbums$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistAlbumsTry),
      concatMap(action =>
        this.artistService.albums(action.artistSlugId).pipe(
          map(data => HomePageActions.artistAlbumsSuccess({
            message: 'آلبوم های هنرمند با موفقیت دریافت شدند.',
            albums: data.data
          })),
          catchError(() => of(HomePageActions.artistAlbumsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistPopularPlaysTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistPopularPlaysTracksTry),
      concatMap(action =>
        this.artistService.popularPlaysTracks(action.artistSlugId).pipe(
          map(data => HomePageActions.artistPopularPlaysTracksSuccess({
            message: 'قطعات محبوب با موفقیت دریافت شدند.',
            tracks: data.data
          })),
          catchError(() => of(HomePageActions.artistPopularPlaysTracksError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistPopularDownloadsTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistPopularDownloadsTracksTry),
      concatMap(action =>
        this.artistService.popularDownloadsTracks(action.artistSlugId).pipe(
          map(data => HomePageActions.artistPopularDownloadsTracksSuccess({
            message: 'قطعات محبوب با موفقیت دریافت شدند.',
            tracks: data.data
          })),
          catchError(() => of(HomePageActions.artistPopularDownloadsTracksError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistPopularRatesTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistPopularRatesTracksTry),
      concatMap(action =>
        this.artistService.popularRatesTracks(action.artistSlugId).pipe(
          map(data => HomePageActions.artistPopularRatesTracksSuccess({
            message: 'قطعات محبوب با موفقیت دریافت شدند.',
            tracks: data.data
          })),
          catchError(() => of(HomePageActions.artistPopularRatesTracksError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  playArtist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.playArtistTry),
      concatMap(action =>
        this.playService.playArtist(action.slugId).pipe(
          map(data => HomePageActions.playArtistSuccess({
            message: 'قطعات اخیر هنرمند با موفقیت به لیست پخش اضافه شد.',
            tracks: data.data
          })),
          tap((action) => {
            this.dbService
              .clear(fromDbConfig.homePlayerKey)
              .subscribe((successDeleted) => {
                if (successDeleted) {
                  action.tracks.forEach((item) => {
                    this.dbService.add(fromDbConfig.homePlayerKey, {
                      playable: item.playable,
                      slug: item.slug,
                      name: item.name,
                      artist: item.artist,
                      url: item.url,
                      cover: item.cover,
                      type: item.type,
                    });
                  });
                }
              });
          }),
          catchError(() => of(HomePageActions.playArtistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  addToNowPlayingArtist$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.addToNowPlayingArtistTry),
      concatMap(action =>
        this.playService.playArtist(action.slugId).pipe(
          map(data => HomePageActions.addToNowPlayingArtistSuccess({
            message: 'قطعات اخیر هنرمند با موفقیت به لیست پخش اضافه شد.',
            tracks: data.data
          })),
          tap((action) => {
            action.tracks.forEach((item: any) => {
              this.dbService.add(fromDbConfig.homePlayerKey, {
                playable: item.playable,
                slug: item.slug,
                name: item.name,
                artist: item.artist,
                url: item.url,
                cover: item.cover,
                type: item.type,
              });
            });
          }),
          catchError(() => of(HomePageActions.addToNowPlayingArtistError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistAllTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistAllTracksTry),
      concatMap(action =>
        this.artistService.allTracks(action.artistSlugId, action.page).pipe(
          map(data => HomePageActions.artistAllTracksSuccess({
            tracks: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.artistAllTracksError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistAllTracksLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistAllTracksLoadMoreTry),
      concatMap(action =>
        this.artistService.allTracks(action.artistSlugId, action.page).pipe(
          map(data => HomePageActions.artistAllTracksLoadMoreSuccess({
            tracks: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.artistAllTracksLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistAllAlbums$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistAllAlbumsTry),
      concatMap(action =>
        this.artistService.allAlbums(action.artistSlugId, action.page).pipe(
          map(data => HomePageActions.artistAllAlbumsSuccess({
            albums: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.artistAllAlbumsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistAllAlbumsLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistAllAlbumsLoadMoreTry),
      concatMap(action =>
        this.artistService.allAlbums(action.artistSlugId, action.page).pipe(
          map(data => HomePageActions.artistAllAlbumsLoadMoreSuccess({
            albums: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.artistAllAlbumsLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistAllMusics$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistAllMusicsTry),
      concatMap(action =>
        this.artistService.allMusics(action.artistSlug, action.page).pipe(
          map(data => HomePageActions.artistAllMusicsSuccess({
            musics: data.data,
            pagination: {
              totalItems: data.meta ? data.meta.total : 0,
              currentPage: data.meta ? data.meta.current_page : data.current_page,
              pageSize: data.meta ? data.meta.per_page : data.per_page,
            },
          })),
          catchError(() => of(HomePageActions.artistAllMusicsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  artistAllMusicsLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.artistAllMusicsLoadMoreTry),
      concatMap(action =>
        this.artistService.allMusics(action.artistSlug, action.page).pipe(
          map(data => HomePageActions.artistAllMusicsLoadMoreSuccess({
            musics: data.data,
            pagination: {
              totalItems: data.meta ? data.meta.total : 0,
              currentPage: data.meta ? data.meta.current_page : data.current_page,
              pageSize: data.meta ? data.meta.per_page : data.per_page,
            },
          })),
          catchError(() => of(HomePageActions.artistAllMusicsLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  recentPlays$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.recentPlaysTracksTry),
      concatMap(action =>
        this.userService.recentPlays().pipe(
          map(data => HomePageActions.recentPlaysTracksSuccess({
            tracks: data.data,
            message: 'پلی های اخیر با موفقیت دریافت شدند.'
          })),
          catchError(() => of(HomePageActions.recentPlaysTracksError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  myPlaylists$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.myPlaylistsTry),
      concatMap(action =>
        this.playlistService.myPlaylists(action.page).pipe(
          map(data => HomePageActions.myPlaylistsSuccess({
            playlists: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.myPlaylistsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  myPlaylistsLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.myPlaylistsLoadMoreTry),
      concatMap(action =>
        this.playlistService.myPlaylists(action.page).pipe(
          map(data => HomePageActions.myPlaylistsLoadMoreSuccess({
            playlists: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.myPlaylistsLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  myPodcasts$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.myPodcastsTry),
      concatMap(action =>
        this.podcastService.myPodcasts(action.page).pipe(
          map(data => HomePageActions.myPodcastsSuccess({
            podcasts: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.myPodcastsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  myPodcastsLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.myPodcastsLoadMoreTry),
      concatMap(action =>
        this.podcastService.myPodcasts(action.page).pipe(
          map(data => HomePageActions.myPodcastsLoadMoreSuccess({
            podcasts: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.myPodcastsLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  myMusics$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.myMusicsTry),
      concatMap(action =>
        this.userService.myMusic(action.page).pipe(
          map(data => HomePageActions.myMusicsSuccess({
            tracks: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.myMusicsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  myMusicsLoadMore$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.myMusicsLoadMoreTry),
      concatMap(action =>
        this.userService.myMusic(action.page).pipe(
          map(data => HomePageActions.myMusicsLoadMoreSuccess({
            tracks: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.myMusicsLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  removeFromPlayer$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.removeFromPlayerTry),
      concatMap(action =>
        this.dbService.deleteByKey('player', action.id).pipe(
          map(data => HomePageActions.removeFromPlayerSuccess({
            message: 'آیتم مورد نظر با موفقیت از لیست حذف شد.',
          })),
          catchError(() => of(HomePageActions.removeFromPlayerError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  featuredPersianTracks$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.featuredPersianTracksTry),
      concatMap(action =>
        this.trackService.featured().pipe(
          map(data => HomePageActions.featuredPersianTracksSuccess({
            message: 'قطعات ویژه با موفقیت دریافت شدند.',
            tracks: data.data
          })),
          catchError(() => of(HomePageActions.featuredPersianTracksError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  featuredPersianAlbums$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.featuredPersianAlbumsTry),
      concatMap(action =>
        this.albumService.featured().pipe(
          map(data => HomePageActions.featuredPersianAlbumsSuccess({
            message: 'آلبوم های ویژه با موفقیت دریافت شدند.',
            albums: data.data
          })),
          catchError(() => of(HomePageActions.featuredPersianAlbumsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  featuredCategories$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.featuredCategoriesTry),
      concatMap(action =>
        this.playlistService.featuredCategories().pipe(
          map(data => HomePageActions.featuredCategoriesSuccess({
            message: 'دسته بندی های ویژه با موفقیت دریافت شدند.',
            categories: data.data
          })),
          catchError(() => of(HomePageActions.featuredCategoriesError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  featuredGenres$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.featuredGenresTry),
      concatMap(action =>
        this.genreService.featured().pipe(
          map(data => HomePageActions.featuredGenresSuccess({
            message: 'ژانر ها با موفقیت دریافت شدند.',
            genres: data.data
          })),
          catchError(() => of(HomePageActions.featuredGenresError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  featuredPodcasts$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.featuredPodcastsTry),
      concatMap(action =>
        this.podcastService.featured().pipe(
          map(data => HomePageActions.featuredPodcastsSuccess({
            message: 'پادکست ها با موفقیت دریافت شدند.',
            podcasts: data.data
          })),
          catchError(() => of(HomePageActions.featuredPodcastsError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  featuredPlaylistsDiscover$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.featuredPlaylistsDiscoverTry),
      concatMap(action =>
        this.playlistService.featured(15).pipe(
          map(data => HomePageActions.featuredPlaylistsDiscoverSuccess({
            message: 'پلی لیست ها با موفقیت دریافت شدند.',
            playlists: data.data
          })),
          catchError(() => of(HomePageActions.featuredPlaylistsDiscoverError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  featured$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.featuredTry),
      concatMap(action =>
        this.sliderService.featureBanner().pipe(
          map(data => HomePageActions.featuredSuccess({
            message: 'بنر های ویژه موفقیت دریافت شد.',
            featured: data.data
          })),
          catchError(() => of(HomePageActions.featuredError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  slider$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.sliderTry),
      concatMap(action =>
        this.sliderService.index().pipe(
          map(data => HomePageActions.sliderSuccess({
            message: 'اسلاید ها با موفقیت دریافت شد.',
            sliders: data.data
          })),
          catchError(() => of(HomePageActions.sliderError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  search$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.searchTry),
      concatMap(action =>
        this.searchService.search(action.query, action.filter, action.page).pipe(
          map(data => HomePageActions.searchSuccess({
            message: 'نتایج جستجو دریافت شد.',
            result: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.searchError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  loadmoreSearch$ = createEffect((): Observable<any> =>
    this.actions$.pipe(
      ofType(HomePageActions.searchLoadMoreTry),
      concatMap(action =>
        this.searchService.search(action.query, action.filter, action.page).pipe(
          map(data => HomePageActions.searchLoadMoreSuccess({
            message: 'نتایج جستجو دریافت شد.',
            result: data.data,
            pagination: {
              totalItems: data.meta.total,
              currentPage: data.meta.current_page,
              pageSize: data.meta.per_page,
            },
          })),
          catchError(() => of(HomePageActions.searchLoadMoreError({error: 'عملیات با خطا مواجه شد.'}))),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private dbService: NgxIndexedDBService,
    private checkPlatformService: CheckPlatformService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private trackService: TrackService,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private podcastService: PodcastService,
    private playlistService: PlaylistService,
    private genreService: GenreService,
    private scoreRateService: ScoreRateService,
    private playService: PlayService,
    private downloadService: DownloadService,
    private commentService: CommentService,
    private musicsService: MusicsService,
    private sliderService: SliderService,
    private searchService: SearchService
  ) {
  }
}
