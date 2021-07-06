import {Injectable} from "@angular/core";

import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
// state
import * as HomePageActions from './home.actions';
import * as selectors from './home.selectors';
// models
import {CurrentUser} from "../../../shared/models/current-user/current-user.model";
import {ProfileData} from "../../../shared/models/profile-data/profile-data.model";
import {Track} from "../../../shared/models/track/track.model";
import {Artist} from "../../../shared/models/artist/artist.model";
import {Album} from "../../../shared/models/album/album.model";
import {AlbumTracks} from "../../../shared/models/album-tracks/album-tracks.model";
import {Podcast} from "../../../shared/models/podcast/podcast.model";
import {PodcastEpisodes} from "../../../shared/models/podcast-episodes/podcast-episodes.model";
import {Playlist} from "../../../shared/models/playlist/playlist.model";
import {PlaylistTracks} from "../../../shared/models/playlist-tracks/playlist-tracks.model";
import {Categories} from "../../../shared/models/categories/categories.model";
import {Genres} from "../../../shared/models/genres/genres.model";
import {Pagination} from "../../../shared/models/pagination/pagination.model";

@Injectable({
  providedIn: 'root'
})
export class HomeFacade {

  public readonly message$: Observable<string | null> = this.store.pipe(select(selectors.selectHomeMessage));
  public readonly error$: Observable<string | null> = this.store.pipe(select(selectors.selectHomeError));
  public readonly loading$: Observable<boolean> = this.store.pipe(select(selectors.selectHomeLoading));
  public readonly buttonLoading$: Observable<boolean> = this.store.pipe(select(selectors.selectHomeButtonLoading));
  public readonly sectionLoading$: Observable<boolean> = this.store.pipe(select(selectors.selectHomeSectionLoading));
  public readonly isLoggedIn$: Observable<boolean> = this.store.pipe(select(selectors.selectHomeCheckAuth));
  public readonly uploadImageName$: Observable<string | null> = this.store.pipe(select(selectors.selectHomeUploadImageName));
  public readonly currentUser$: Observable<CurrentUser> = this.store.pipe(select(selectors.selectHomeCurrentUser));
  public readonly profilePageData$: Observable<ProfileData> = this.store.pipe(select(selectors.selectHomeProfilePageData));
  public readonly track$: Observable<Track> = this.store.pipe(select(selectors.selectHomeTrack));
  public readonly artist$: Observable<Artist> = this.store.pipe(select(selectors.selectHomeArtist));
  public readonly album$: Observable<Album> = this.store.pipe(select(selectors.selectHomeAlbum));
  public readonly albumTracks$: Observable<AlbumTracks> = this.store.pipe(select(selectors.selectHomeAlbumTracks));
  public readonly podcast$: Observable<Podcast> = this.store.pipe(select(selectors.selectHomePodcast));
  public readonly podcastEpisodes$: Observable<PodcastEpisodes> = this.store.pipe(select(selectors.selectHomePodcastEpisodes));
  public readonly playlist$: Observable<Playlist> = this.store.pipe(select(selectors.selectHomePlaylist));
  public readonly playlistTracks$: Observable<PlaylistTracks> = this.store.pipe(select(selectors.selectHomePlaylistTracks));
  public readonly categories$: Observable<Categories> = this.store.pipe(select(selectors.selectHomeCategories));
  public readonly genres$: Observable<Genres> = this.store.pipe(select(selectors.selectHomeGenres));
  public readonly player$: Observable<any> = this.store.pipe(select(selectors.selectHomePlayer));
  public readonly relatedTracks$: Observable<any> = this.store.pipe(select(selectors.selectHomeRelatedTracks));
  public readonly addToPlaylistTrackSlug$: Observable<string | null> = this.store.pipe(select(selectors.selectHomeAddToPlaylistTrackSlug));
  public readonly addToPlaylistAlbumSlug$: Observable<string | null> = this.store.pipe(select(selectors.selectHomeAddToPlaylistAlbumSlug));
  public readonly comments$: Observable<any> = this.store.pipe(select(selectors.selectHomeComments));
  public readonly pagination$: Observable<Pagination> = this.store.pipe(select(selectors.selectHomePagination));
  public readonly nowPlaying$: Observable<any> = this.store.pipe(select(selectors.selectHomeNowPlaying));
  public readonly playlists$: Observable<any[]> = this.store.pipe(select(selectors.selectHomePlaylists));
  public readonly followers$: Observable<any[]> = this.store.pipe(select(selectors.selectHomeFollowers));
  public readonly followings$: Observable<any[]> = this.store.pipe(select(selectors.selectHomeFollowings));
  public readonly podcasts$: Observable<any[]> = this.store.pipe(select(selectors.selectHomePodcasts));
  public readonly tracks$: Observable<any[]> = this.store.pipe(select(selectors.selectHomeTracks));
  public readonly musics$: Observable<any[]> = this.store.pipe(select(selectors.selectHomeMusics));
  public readonly albums$: Observable<any[]> = this.store.pipe(select(selectors.selectHomeAlbums));
  public readonly popular$: Observable<any[]> = this.store.pipe(select(selectors.selectHomePopular));
  public readonly featuredPersianTracks$: Observable<any> = this.store.pipe(select(selectors.selectFeaturedPersianTracks));
  public readonly featuredPersianAlbums$: Observable<any> = this.store.pipe(select(selectors.selectFeaturedPersianAlbums));
  public readonly featuredCategories$: Observable<any> = this.store.pipe(select(selectors.selectFeaturedCategories));
  public readonly featuredGenres$: Observable<any> = this.store.pipe(select(selectors.selectFeaturedGenres));
  public readonly featuredPodcasts$: Observable<any> = this.store.pipe(select(selectors.selectFeaturedPodcasts));
  public readonly featuredPlaylists$: Observable<any> = this.store.pipe(select(selectors.selectFeaturedPlaylists));
  public readonly sliders$: Observable<any> = this.store.pipe(select(selectors.selectHomeSlider));
  public readonly featured$: Observable<any> = this.store.pipe(select(selectors.selectHomeFeatured));
  public readonly search$: Observable<any> = this.store.pipe(select(selectors.selectHomeSearch));
  public readonly playerNowPlaying$: Observable<any> = this.store.pipe(select(selectors.selectHomePlayerNowPlaying));

  constructor(private readonly store: Store) {
  }

  public dispatchRemoveMessage(): void {
    this.store.dispatch(HomePageActions.removeMessageTry());
  }

  public dispatchRemoveError(): void {
    this.store.dispatch(HomePageActions.removeErrorTry());
  }

  public dispatchSendMessage(message: string): void {
    this.store.dispatch(HomePageActions.sendMessageTry({message}));
  }

  public dispatchSendError(error: string): void {
    this.store.dispatch(HomePageActions.sendErrorTry({error}));
  }

  public dispatchCheckAuth(): void {
    this.store.dispatch(HomePageActions.checkAuthTry());
  }

  public async dispatchUploadImage(file: File, dimensions: string) {
    this.store.dispatch(HomePageActions.uploadImageTry({file, dimensions}));
  }

  public dispatchCurrentUser(): void {
    this.store.dispatch(HomePageActions.currentUserTry());
  }

  public async dispatchUpdateAvatar(imageName: string) {
    this.store.dispatch(HomePageActions.updateAvatarTry({imageName}))
  }

  public async dispatchRemoveAvatar() {
    this.store.dispatch(HomePageActions.removeAvatarTry());
  }

  public dispatchUpdateName(name: string): void {
    this.store.dispatch(HomePageActions.updateNameTry({name}));
  }

  public dispatchUpdateUsername(username: string): void {
    this.store.dispatch(HomePageActions.updateUsernameTry({username}));
  }

  public dispatchUpdatePassword(password: string, newPassword: string): void {
    this.store.dispatch(HomePageActions.updatePasswordTry({password, newPassword}));
  }

  public dispatchSendUpdateEmailCode(email: string): void {
    this.store.dispatch(HomePageActions.sendUpdateEmailCodeTry({email}));
  }

  public async dispatchUpdateEmail(email: string, code: string) {
    this.store.dispatch(HomePageActions.updateEmailTry({email, code}));
  }

  public dispatchSendUpdateMobileCode(mobile: string): void {
    this.store.dispatch(HomePageActions.sendUpdateMobileCodeTry({mobile}));
  }

  public async dispatchUpdateMobile(mobile: string, code: string) {
    this.store.dispatch(HomePageActions.updateMobileTry({mobile, code}));
  }

  public dispatchDeactivateAccount(): void {
    this.store.dispatch(HomePageActions.deactivateAccountTry());
  }

  public dispatchSignOut(): void {
    this.store.dispatch(HomePageActions.signOutTry());
  }

  public dispatchProfilePage(username: string): void {
    this.store.dispatch(HomePageActions.profilePageTry({username}));
  }

  public dispatchProfilePageRefresh(username: string): void {
    this.store.dispatch(HomePageActions.profilePageRefreshTry({username}));
  }

  public async dispatchFollowUser(username: string) {
    this.store.dispatch(HomePageActions.followUserActionTry({username}));
  }

  public dispatchTrack(slugId: string): void {
    this.store.dispatch(HomePageActions.trackTry({slugId}));
  }

  public dispatchArtist(slugId: string): void {
    this.store.dispatch(HomePageActions.artistTry({slugId}));
  }

  public dispatchArtistRefresh(slugId: string): void {
    this.store.dispatch(HomePageActions.artistRefreshTry({slugId}));
  }

  public async dispatchFollowArtist(slugId: string) {
    this.store.dispatch(HomePageActions.followArtistActionTry({slugId}));
  }

  public dispatchAlbum(slugId: string): void {
    this.store.dispatch(HomePageActions.albumTry({slugId}));
  }

  public dispatchAlbumTracks(slugId: string): void {
    this.store.dispatch(HomePageActions.albumTracksTry({slugId}));
  }

  public dispatchPodcast(slugId: string): void {
    this.store.dispatch(HomePageActions.podcastTry({slugId}));
  }

  public dispatchPodcastRefresh(slugId: string): void {
    this.store.dispatch(HomePageActions.podcastRefreshTry({slugId}));
  }

  public async dispatchFollowPodcast(slugId: string) {
    this.store.dispatch(HomePageActions.followPodcastActionTry({slugId}));
  }

  public dispatchPodcastEpisodes(slugId: string): void {
    this.store.dispatch(HomePageActions.podcastEpisodesTry({slugId}));
  }

  public dispatchPlaylist(slugId: string): void {
    this.store.dispatch(HomePageActions.playlistTry({slugId}));
  }

  public dispatchRefreshPlaylist(slugId: string): void {
    this.store.dispatch(HomePageActions.refreshPlaylistTry({slugId}));
  }

  public dispatchPlaylistTracks(slugId: string): void {
    this.store.dispatch(HomePageActions.playlistTracksTry({slugId}));
  }

  public dispatchCategories(): void {
    this.store.dispatch(HomePageActions.categoriesTry());
  }

  public dispatchGenres(): void {
    this.store.dispatch(HomePageActions.genresTry());
  }

  public dispatchRateTrack(slugId: string, rate: number): void {
    this.store.dispatch(HomePageActions.rateTrackTry({slugId, rate}));
  }

  public dispatchRateAlbum(slugId: string, rate: number): void {
    this.store.dispatch(HomePageActions.rateAlbumTry({slugId, rate}));
  }

  public dispatchAddTrackToPlaylist(trackSlugId: string, playlistId: number | string) {
    this.store.dispatch(HomePageActions.addTrackToPlaylistTry({trackSlugId, playlistId}));
  }

  public dispatchInitPlayerTracks(tracks: any) {
    this.store.dispatch(HomePageActions.initPlayerTracksTry({tracks}));
  }

  public dispatchStorePlay(playable: string, slugId: string) {
    this.store.dispatch(HomePageActions.storePlayTry({playable, slugId}));
  }

  public dispatchPlayTrack(slugId: string) {
    this.store.dispatch(HomePageActions.playTrackTry({slugId}));
  }

  public dispatchAddToNowPlayingTrack(slugId: string) {
    this.store.dispatch(HomePageActions.addToNowPlayingTrackTry({slugId}));
  }

  public dispatchDownloadTrack(slugId: string) {
    this.store.dispatch(HomePageActions.downloadTrackTry({slugId}));
  }

  public dispatchRelatedTracks(model: string, slugId: string) {
    this.store.dispatch(HomePageActions.relatedTracksTry({model, slugId}));
  }

  public dispatchAddToPlaylistTrackSlug(addToPlaylistTrackSlug: string | null) {
    this.store.dispatch(HomePageActions.addToPlaylistTrackSlugTry({addToPlaylistTrackSlug}))
  }

  public dispatchAddToPlaylistAlbumSlug(addToPlaylistAlbumSlug: string | null) {
    this.store.dispatch(HomePageActions.addToPlaylistAlbumSlugTry({addToPlaylistAlbumSlug}))
  }

  public dispatchStoreComment(content: string, commentableType: string, commentableId: string) {
    this.store.dispatch(HomePageActions.storeCommentTry({content, commentableType, commentableId}))
  }

  public dispatchShowComments(commentableType: string, commentableId: string, page: number = 1) {
    this.store.dispatch(HomePageActions.commentsTry({commentableType, commentableId, page}))
  }

  public dispatchPlayAlbum(slugId: string) {
    this.store.dispatch(HomePageActions.playAlbumTry({slugId}));
  }

  public dispatchAddToNowPlayingAlbum(slugId: string) {
    this.store.dispatch(HomePageActions.addToNowPlayingAlbumTry({slugId}));
  }

  public dispatchAddAlbumToPlaylist(albumSlugId: string, playlistId: number | string) {
    this.store.dispatch(HomePageActions.addAlbumToPlaylistTry({albumSlugId, playlistId}));
  }

  public dispatchDownloadEpisode(slugId: string) {
    this.store.dispatch(HomePageActions.downloadEpisodeTry({slugId}));
  }

  public dispatchPlayEpisode(slugId: string) {
    this.store.dispatch(HomePageActions.playEpisodeTry({slugId}));
  }

  public dispatchPlayPlaylist(slugId: string) {
    this.store.dispatch(HomePageActions.playPlaylistTry({slugId}));
  }

  public dispatchAddToNowPlayingPlaylist(slugId: string) {
    this.store.dispatch(HomePageActions.addToNowPlayingPlaylistTry({slugId}));
  }

  public dispatchRemovePlaylist(slugId: string) {
    this.store.dispatch(HomePageActions.removePlaylistTry({slugId}));
  }

  public async dispatchUpdatePlaylist(slugId: string, title: string, playlistType: string, featured: boolean) {
    this.store.dispatch(HomePageActions.updatePlaylistTry({slugId, title, playlistType, featured}));
  }

  public dispatchCreatePlaylist(title: string, playlistType: string, featured: boolean): void {
    this.store.dispatch(HomePageActions.createPlaylistTry({title, playlistType, featured}));
  }

  public async dispatchRemoveTrackFromPlaylist(trackSlugId: string, playlistId: number | string) {
    this.store.dispatch(HomePageActions.removeTrackFromPlaylistTry({trackSlugId, playlistId}));
  }

  public dispatchFeaturedPlaylists(takeNumber: number) {
    this.store.dispatch(HomePageActions.featuredPlaylistsTry({takeNumber}));
  }

  public dispatchPlaylistsByCategory(categorySlug: string, page: number = 1) {
    this.store.dispatch(HomePageActions.playlistsByCategoryTry({categorySlug, page}))
  }

  public dispatchPlaylistsByCategoryLoadMore(categorySlug: string, page: number = 1) {
    this.store.dispatch(HomePageActions.playlistsByCategoryLoadMoreTry({categorySlug, page}))
  }

  public dispatchProfilePublicPlaylists(username: string) {
    this.store.dispatch(HomePageActions.profilePublicPlaylistsTry({username}));
  }

  public dispatchProfileFollowers(username: string) {
    this.store.dispatch(HomePageActions.profileFollowersTry({username}));
  }

  public dispatchProfileFollowings(username: string) {
    this.store.dispatch(HomePageActions.profileFollowingsTry({username}));
  }

  public dispatchProfileAllPublicPlaylists(username: string, page: number = 1) {
    this.store.dispatch(HomePageActions.profileAllPublicPlaylistsTry({username, page}))
  }

  public dispatchProfileLoadMorePublicPlaylists(username: string, page: number = 1) {
    this.store.dispatch(HomePageActions.profileLoadMorePublicPlaylistsTry({username, page}))
  }

  public dispatchProfileAllFollowers(username: string, page: number = 1) {
    this.store.dispatch(HomePageActions.profileAllFollowersTry({username, page}))
  }

  public dispatchProfileLoadMoreAllFollowers(username: string, page: number = 1) {
    this.store.dispatch(HomePageActions.profileLoadMoreAllFollowersTry({username, page}))
  }

  public dispatchProfileAllFollowings(username: string, page: number = 1) {
    this.store.dispatch(HomePageActions.profileAllFollowingsTry({username, page}))
  }

  public dispatchProfileLoadMoreAllFollowings(username: string, page: number = 1) {
    this.store.dispatch(HomePageActions.profileLoadMoreAllFollowingsTry({username, page}))
  }

  public dispatchPodcasts(page: number = 1) {
    this.store.dispatch(HomePageActions.podcastsTry({page}))
  }

  public dispatchPodcastsLoadMore(page: number = 1) {
    this.store.dispatch(HomePageActions.podcastsLoadMoreTry({page}))
  }

  public dispatchChartsTrack(type: string, duration: string, sortBy: string) {
    this.store.dispatch(HomePageActions.chartsTrackTry({trackType: type, duration, sortBy}))
  }

  public dispatchChartsTrackRefresh(type: string, duration: string, sortBy: string) {
    this.store.dispatch(HomePageActions.chartsTrackRefreshTry({trackType: type, duration, sortBy}))
  }

  public dispatchMusics(type: string, genre: string, filter: string, page: number) {
    this.store.dispatch(HomePageActions.musicsTry({musicType: type, genre, filter, page}))
  }

  public dispatchRefreshMusics(type: string, genre: string, filter: string, page: number) {
    this.store.dispatch(HomePageActions.musicsRefreshTry({musicType: type, genre, filter, page}))
  }

  public dispatchLoadMoreMusics(type: string, genre: string, filter: string, page: number) {
    this.store.dispatch(HomePageActions.musicsLoadMoreTry({musicType: type, genre, filter, page}))
  }

  public dispatchArtistTracks(artistSlugId: string) {
    this.store.dispatch(HomePageActions.artistTracksTry({artistSlugId}))
  }

  public dispatchArtistAlbums(artistSlugId: string) {
    this.store.dispatch(HomePageActions.artistAlbumsTry({artistSlugId}))
  }

  public dispatchArtistPopularPlaysTracks(artistSlugId: string) {
    this.store.dispatch(HomePageActions.artistPopularPlaysTracksTry({artistSlugId}))
  }

  public dispatchArtistPopularDownloadsTracks(artistSlugId: string) {
    this.store.dispatch(HomePageActions.artistPopularDownloadsTracksTry({artistSlugId}))
  }

  public dispatchArtistPopularRatesTracks(artistSlugId: string) {
    this.store.dispatch(HomePageActions.artistPopularRatesTracksTry({artistSlugId}))
  }

  public dispatchPlayArtist(slugId: string) {
    this.store.dispatch(HomePageActions.playArtistTry({slugId}));
  }

  public dispatchAddToNowPlayingArtist(slugId: string) {
    this.store.dispatch(HomePageActions.addToNowPlayingArtistTry({slugId}));
  }

  public dispatchArtistAllTracks(artistSlugId: string, page: number = 1) {
    this.store.dispatch(HomePageActions.artistAllTracksTry({artistSlugId, page}));
  }

  public dispatchArtistAllTracksLoadMore(artistSlugId: string, page: number = 1) {
    this.store.dispatch(HomePageActions.artistAllTracksLoadMoreTry({artistSlugId, page}));
  }

  public dispatchArtistAllAlbums(artistSlugId: string, page: number = 1) {
    this.store.dispatch(HomePageActions.artistAllAlbumsTry({artistSlugId, page}));
  }

  public dispatchArtistAllAlbumsLoadMore(artistSlugId: string, page: number = 1) {
    this.store.dispatch(HomePageActions.artistAllAlbumsLoadMoreTry({artistSlugId, page}));
  }

  public dispatchArtistAllMusics(artistSlug: string, page: number = 1) {
    this.store.dispatch(HomePageActions.artistAllMusicsTry({artistSlug, page}));
  }

  public dispatchArtistAllMusicsLoadMore(artistSlug: string, page: number = 1) {
    this.store.dispatch(HomePageActions.artistAllMusicsLoadMoreTry({artistSlug, page}));
  }

  public dispatchRecentPlays() {
    this.store.dispatch(HomePageActions.recentPlaysTracksTry());
  }

  public dispatchMyPlaylists(page: number = 1) {
    this.store.dispatch(HomePageActions.myPlaylistsTry({page}));
  }

  public dispatchMyPlaylistsLoadMore(page: number = 1) {
    this.store.dispatch(HomePageActions.myPlaylistsLoadMoreTry({page}));
  }

  public dispatchMyPodcasts(page: number = 1) {
    this.store.dispatch(HomePageActions.myPodcastsTry({page}));
  }

  public dispatchMyPodcastsLoadMore(page: number = 1) {
    this.store.dispatch(HomePageActions.myPodcastsLoadMoreTry({page}));
  }

  public dispatchMyMusics(page: number = 1) {
    this.store.dispatch(HomePageActions.myMusicsTry({page}));
  }

  public dispatchMyMusicsLoadMore(page: number = 1) {
    this.store.dispatch(HomePageActions.myMusicsLoadMoreTry({page}));
  }

  public async dispatchRemoveFromPlaylist(slug: string, id: number) {
    this.store.dispatch(HomePageActions.removeFromPlayerTry({slug, id}));
  }

  public dispatchUpdateNowPlaying(
    playable: string,
    slug: string,
    duration: string,
    name: string,
    artist: string,
    url: string,
    cover: string,
    typeTrack: string
  ) {
    this.store.dispatch(HomePageActions.updateNowPlayingTry({
      playable,
      slug,
      duration,
      name,
      artist,
      url,
      cover,
      typeTrack
    }));
  }

  public async dispatchFeaturedPersianTracks() {
    this.store.dispatch(HomePageActions.featuredPersianTracksTry());
  }

  public async dispatchFeaturedPersianAlbums() {
    this.store.dispatch(HomePageActions.featuredPersianAlbumsTry());
  }

  public async dispatchFeaturedCategories() {
    this.store.dispatch(HomePageActions.featuredCategoriesTry());
  }

  public async dispatchFeaturedGenres() {
    this.store.dispatch(HomePageActions.featuredGenresTry());
  }

  public async dispatchFeaturedPodcasts() {
    this.store.dispatch(HomePageActions.featuredPodcastsTry());
  }

  public async dispatchFeaturedPlaylistsDiscover() {
    this.store.dispatch(HomePageActions.featuredPlaylistsDiscoverTry());
  }

  public async dispatchSlider() {
    this.store.dispatch(HomePageActions.sliderTry());
  }

  public async dispatchFeature() {
    this.store.dispatch(HomePageActions.featuredTry());
  }

  public dispatchSearch(query: string, filter: string, page: number = 1) {
    this.store.dispatch(HomePageActions.searchTry({query, filter, page}));
  }

  public dispatchLoadMoreSearch(query: string, filter: string, page: number = 1) {
    this.store.dispatch(HomePageActions.searchLoadMoreTry({query, filter, page}));
  }
}
