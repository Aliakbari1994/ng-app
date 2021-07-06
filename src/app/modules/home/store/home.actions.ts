import {createAction, props} from '@ngrx/store';

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

// remove message
export const removeMessageTry = createAction(
  '[Remove Message] Try Remove Message'
);
// remove error
export const removeErrorTry = createAction(
  '[Remove Error] Try Remove Error'
);
// send message
export const sendMessageTry = createAction(
  '[Send Message] Try Send Message',
  props<{ message: string }>()
);
// send error
export const sendErrorTry = createAction(
  '[Send Error] Try Send Error',
  props<{ error: string }>()
);
// check auth
export const checkAuthTry = createAction(
  '[Check Auth] Try Check Auth'
);
export const checkAuthSuccess = createAction(
  '[Check Auth] Check Auth Successful',
  props<{ isLoggedIn: boolean }>()
);
export const checkAuthError = createAction(
  '[Check Auth] Check Auth Error'
);
// upload image
export const uploadImageTry = createAction(
  '[Upload Image] Try Upload Image',
  props<{ file: File, dimensions: string }>()
);
export const uploadImageSuccess = createAction(
  '[Upload Image] Upload Image Successful',
  props<{ message: string, uploadImageName: string }>()
);
export const uploadImageError = createAction(
  '[Upload Image] Upload Image Error',
  props<{ error: string }>()
);
// current user
export const currentUserTry = createAction(
  '[Get Current User] Try Get Current User'
);
export const currentUserSuccess = createAction(
  '[Get Current User] Get Current User Successful',
  props<{ currentUser: CurrentUser }>()
);
export const currentUserError = createAction(
  '[Get Current User] Get Current User Error'
);
// remove avatar
export const updateAvatarTry = createAction(
  '[Update User Avatar] Try Update User Avatar',
  props<{ imageName: string }>()
);
export const updateAvatarSuccess = createAction(
  '[Update User Avatar] Update User Avatar Successful',
  props<{ message: string }>()
);
export const updateAvatarError = createAction(
  '[Update User Avatar] Update User Avatar Error',
  props<{ error: string }>()
);
// remove avatar
export const removeAvatarTry = createAction(
  '[Remove User Avatar] Try Remove User Avatar'
);
export const removeAvatarSuccess = createAction(
  '[Remove User Avatar] Remove User Avatar Successful',
  props<{ message: string }>()
);
export const removeAvatarError = createAction(
  '[Remove User Avatar] Remove User Avatar Error',
  props<{ error: string }>()
);
// update name
export const updateNameTry = createAction(
  '[Update Name] Try Update Name',
  props<{ name: string }>()
);
export const updateNameSuccess = createAction(
  '[Update Name] Update Name Successful',
  props<{ message: string }>()
);
export const updateNameError = createAction(
  '[Update Name] Update Name Error',
  props<{ error: string }>()
);
// update username
export const updateUsernameTry = createAction(
  '[Update Username] Try Update Username',
  props<{ username: string }>()
);
export const updateUsernameSuccess = createAction(
  '[Update Username] Update Username Successful',
  props<{ message: string }>()
);
export const updateUsernameError = createAction(
  '[Update Username] Update Username Error',
  props<{ error: string }>()
);
// update password
export const updatePasswordTry = createAction(
  '[Update Password] Try Update Password',
  props<{ password: string, newPassword: string }>()
);
export const updatePasswordSuccess = createAction(
  '[Update Password] Update Password Successful',
  props<{ message: string }>()
);
export const updatePasswordError = createAction(
  '[Update Password] Update Password Error',
  props<{ error: string }>()
);
// send update email code
export const sendUpdateEmailCodeTry = createAction(
  '[Send Update Email Code] Try Send Update Email Code',
  props<{ email: string }>()
);
export const sendUpdateEmailCodeSuccess = createAction(
  '[Send Update Email Code] Send Update Email Code Successful',
  props<{ message: string }>()
);
export const sendUpdateEmailCodeError = createAction(
  '[Send Update Email Code] Send Update Email Code Error',
  props<{ error: string }>()
);
// update email
export const updateEmailTry = createAction(
  '[Update Email] Try Update Email',
  props<{ email: string, code: string }>()
);
export const updateEmailSuccess = createAction(
  '[Update Email] Update Email Successful',
  props<{ message: string }>()
);
export const updateEmailError = createAction(
  '[Update Email] Update Email Error',
  props<{ error: string }>()
);
// send update mobile code
export const sendUpdateMobileCodeTry = createAction(
  '[Send Update Mobile Code] Try Send Update Mobile Code',
  props<{ mobile: string }>()
);
export const sendUpdateMobileCodeSuccess = createAction(
  '[Send Update Mobile Code] Send Update Mobile Code Successful',
  props<{ message: string }>()
);
export const sendUpdateMobileCodeError = createAction(
  '[Send Update Mobile Code] Send Update Mobile Code Error',
  props<{ error: string }>()
);
// update mobile
export const updateMobileTry = createAction(
  '[Update Mobile] Try Update Mobile',
  props<{ mobile: string, code: string }>()
);
export const updateMobileSuccess = createAction(
  '[Update Mobile] Update Mobile Successful',
  props<{ message: string }>()
);
export const updateMobileError = createAction(
  '[Update Mobile] Update Mobile Error',
  props<{ error: string }>()
);
// deactivate account
export const deactivateAccountTry = createAction(
  '[Deactivate Account] Try Deactivate Account'
);
export const deactivateAccountSuccess = createAction(
  '[Deactivate Account] Deactivate Account Successful',
  props<{ message: string }>()
);
export const deactivateAccountError = createAction(
  '[Deactivate Account] Deactivate Account Error',
  props<{ error: string }>()
);
// sign out
export const signOutTry = createAction(
  '[Sign Out] Try Sign Out'
);
export const signOutSuccess = createAction(
  '[Sign Out] Sign Out Successful',
  props<{ message: string }>()
);
export const signOutError = createAction(
  '[Sign Out] Sign Out Error',
  props<{ error: string }>()
);
// profile page
export const profilePageTry = createAction(
  '[Profile Page] Try Profile Page',
  props<{ username: string }>()
);
export const profilePageSuccess = createAction(
  '[Profile Page] Profile Page Successful',
  props<{ message: string, profileData: ProfileData }>()
);
export const profilePageError = createAction(
  '[Profile Page] Profile Page Error',
  props<{ error: string }>()
);
// profile page refresh
export const profilePageRefreshTry = createAction(
  '[Profile Page Refresh] Try Profile Page Refresh',
  props<{ username: string }>()
);
export const profilePageRefreshSuccess = createAction(
  '[Profile Page Refresh] Profile Page Refresh Successful',
  props<{ message: string, profileData: ProfileData }>()
);
export const profilePageRefreshError = createAction(
  '[Profile Page Refresh] Profile Page Refresh Error',
  props<{ error: string }>()
);
// follow user action
export const followUserActionTry = createAction(
  '[Follow User Action] Try Follow User Action',
  props<{ username: string }>()
);
export const followUserActionSuccess = createAction(
  '[Follow User Action] Follow User Action Successful'
);
export const followUserActionError = createAction(
  '[Follow User Action] Follow User Action Error',
  props<{ error: string }>()
);
// track
export const trackTry = createAction(
  '[Track Page] Try Track',
  props<{ slugId: string }>()
);
export const trackSuccess = createAction(
  '[Track Page] Track Successful',
  props<{ message: string, track: Track }>()
);
export const trackError = createAction(
  '[Track Page] Track Error',
  props<{ error: string }>()
);
// artist
export const artistTry = createAction(
  '[Artist Page] Try Artist',
  props<{ slugId: string }>()
);
export const artistSuccess = createAction(
  '[Artist Page] Artist Successful',
  props<{ message: string, artist: Artist }>()
);
export const artistError = createAction(
  '[Artist Page] Artist Error',
  props<{ error: string }>()
);
// refresh artist
export const artistRefreshTry = createAction(
  '[Artist Refresh] Try Refresh Artist',
  props<{ slugId: string }>()
);
export const artistRefreshSuccess = createAction(
  '[Artist Refresh] Refresh Artist Successful',
  props<{ message: string, artist: Artist }>()
);
export const artistRefreshError = createAction(
  '[Artist Refresh] Refresh Artist Error',
  props<{ error: string }>()
);
// follow artist action
export const followArtistActionTry = createAction(
  '[Follow Artist Action] Try Follow Artist Action',
  props<{ slugId: string }>()
);
export const followArtistActionSuccess = createAction(
  '[Follow Artist Action] Follow Artist Action Successful'
);
export const followArtistActionError = createAction(
  '[Follow Artist Action] Follow Artist Action Error',
  props<{ error: string }>()
);
// album
export const albumTry = createAction(
  '[Album Page] Try Album',
  props<{ slugId: string }>()
);
export const albumSuccess = createAction(
  '[Album Page] Album Successful',
  props<{ message: string, album: Album }>()
);
export const albumError = createAction(
  '[Album Page] Album Error',
  props<{ error: string }>()
);
// album tracks
export const albumTracksTry = createAction(
  '[Album Tracks] Try Album Tracks',
  props<{ slugId: string }>()
);
export const albumTracksSuccess = createAction(
  '[Album Tracks] Album  Tracks Successful',
  props<{ message: string, albumTracks: AlbumTracks }>()
);
export const albumTracksError = createAction(
  '[Album Tracks] Album Tracks Error',
  props<{ error: string }>()
);
// podcast
export const podcastTry = createAction(
  '[Podcast Page] Try Podcast',
  props<{ slugId: string }>()
);
export const podcastSuccess = createAction(
  '[Podcast Page] Podcast Successful',
  props<{ message: string, podcast: Podcast }>()
);
export const podcastError = createAction(
  '[Podcast Page] Podcast Error',
  props<{ error: string }>()
);
// podcast refresh
export const podcastRefreshTry = createAction(
  '[Podcast Page Refresh] Try Podcast Refresh',
  props<{ slugId: string }>()
);
export const podcastRefreshSuccess = createAction(
  '[Podcast Page Refresh] Podcast Refresh Successful',
  props<{ message: string, podcast: Podcast }>()
);
export const podcastRefreshError = createAction(
  '[Podcast Page Refresh] Podcast Refresh Error',
  props<{ error: string }>()
);
// follow podcast action
export const followPodcastActionTry = createAction(
  '[Follow Podcast Action] Try Follow Podcast Action',
  props<{ slugId: string }>()
);
export const followPodcastActionSuccess = createAction(
  '[Follow Podcast Action] Follow Podcast Action Successful'
);
export const followPodcastActionError = createAction(
  '[Follow Podcast Action] Follow Podcast Action Error',
  props<{ error: string }>()
);
// podcast episodes
export const podcastEpisodesTry = createAction(
  '[Podcast Episodes] Try Podcast Episodes',
  props<{ slugId: string }>()
);
export const podcastEpisodesSuccess = createAction(
  '[Podcast Episodes] APodcast Episodes Successful',
  props<{ message: string, podcastEpisodes: PodcastEpisodes }>()
);
export const podcastEpisodesError = createAction(
  '[Podcast Episodes] Podcast Episodes Error',
  props<{ error: string }>()
);
// playlist
export const playlistTry = createAction(
  '[Playlist Page] Try Playlist',
  props<{ slugId: string }>()
);
export const playlistSuccess = createAction(
  '[Playlist Page] Playlist Successful',
  props<{ message: string, playlist: Playlist }>()
);
export const playlistError = createAction(
  '[Playlist Page] Playlist Error',
  props<{ error: string }>()
);
// refresh playlist
export const refreshPlaylistTry = createAction(
  '[Playlist Page Refresh] Try Playlist Refresh',
  props<{ slugId: string }>()
);
export const refreshPlaylistSuccess = createAction(
  '[Playlist Page Refresh] Playlist Refresh Successful',
  props<{ message: string, playlist: Playlist }>()
);
export const refreshPlaylistError = createAction(
  '[Playlist Page Refresh] Playlist Refresh Error',
  props<{ error: string }>()
);
// playlist tracks
export const playlistTracksTry = createAction(
  '[Playlist Tracks] Try Playlist Tracks',
  props<{ slugId: string }>()
);
export const playlistTracksSuccess = createAction(
  '[Playlist Tracks] Playlist  Tracks Successful',
  props<{ message: string, playlistTracks: PlaylistTracks }>()
);
export const playlistTracksError = createAction(
  '[Playlist Tracks] Playlist Tracks Error',
  props<{ error: string }>()
);
// playlist categories
export const categoriesTry = createAction(
  '[Categories Page] Try Categories'
);
export const categoriesSuccess = createAction(
  '[Categories Page] Categories Successful',
  props<{ message: string, categories: Categories }>()
);
export const categoriesError = createAction(
  '[Categories Page] Categories Error',
  props<{ error: string }>()
);
// genre
export const genresTry = createAction(
  '[Genre Page] Try Genre'
);
export const genresSuccess = createAction(
  '[Genre Page] Genre Successful',
  props<{ message: string, genres: Genres }>()
);
export const genresError = createAction(
  '[Genre Page] Genre Error',
  props<{ error: string }>()
);
// rate track
export const rateTrackTry = createAction(
  '[Rate Track] Try Rate Track',
  props<{ slugId: string, rate: number }>()
);
export const rateTrackSuccess = createAction(
  '[Rate Track] Rate Track Successful',
  props<{ message: string }>()
);
export const rateTrackError = createAction(
  '[Rate Track] Rate Track Error',
  props<{ error: string }>()
);
// rate album
export const rateAlbumTry = createAction(
  '[Rate Album] Try Rate Album',
  props<{ slugId: string, rate: number }>()
);
export const rateAlbumSuccess = createAction(
  '[Rate Album] Rate Album Successful',
  props<{ message: string }>()
);
export const rateAlbumError = createAction(
  '[Rate Album] Rate Album Error',
  props<{ error: string }>()
);
// add track to playlist
export const addTrackToPlaylistTry = createAction(
  '[Add Track To Playlist] Try Add Track To Playlist',
  props<{ trackSlugId: string, playlistId: string | number }>()
);
export const addTrackToPlaylistSuccess = createAction(
  '[Add Track To Playlist] Add Track To Playlist Successful',
  props<{ message: string }>()
);
export const addTrackToPlaylistError = createAction(
  '[Add Track To Playlist] Add Track To Playlist Error',
  props<{ error: string }>()
);
// initial player with indexed db
export const initPlayerTracksTry = createAction(
  '[Get Track List From Indexed DB] Try Get Track List',
  props<{ tracks: any }>()
);
// store play
export const storePlayTry = createAction(
  '[Store Play] Try Store Play',
  props<{ playable: string, slugId: string }>()
);
export const storePlaySuccess = createAction(
  '[Store Play] Store Play Successful',
  props<{ message: string }>()
);
export const storePlayError = createAction(
  '[Store Play] Store Play Error',
  props<{ error: string }>()
);
// play track
export const playTrackTry = createAction(
  '[Play Track] Try Play Track',
  props<{ slugId: string }>()
);
export const playTrackSuccess = createAction(
  '[Play Track] Play Track Successful',
  props<{ track: any, message: string }>()
);
export const playTrackError = createAction(
  '[Play Track] Play Track Error',
  props<{ error: string }>()
);
// add to now playing track
export const addToNowPlayingTrackTry = createAction(
  '[Add To Now Playing] Try Add To Now Playing',
  props<{ slugId: string }>()
);
export const addToNowPlayingTrackSuccess = createAction(
  '[Add To Now Playing] Add To Now Playing Successful',
  props<{ track: any, message: string }>()
);
export const addToNowPlayingTrackError = createAction(
  '[Add To Now Playing] Add To Now Playing Error',
  props<{ error: string }>()
);
// download track
export const downloadTrackTry = createAction(
  '[Download Track] Try Download Track',
  props<{ slugId: string }>()
);
export const downloadTrackSuccess = createAction(
  '[Download Track] Download Track Successful',
  props<{ downloadUrl: string, message: string }>()
);
export const downloadTrackError = createAction(
  '[Download Track] Download Track Error',
  props<{ error: string }>()
);
// related tracks
export const relatedTracksTry = createAction(
  '[Related Tracks] Try Related Tracks',
  props<{ model: string, slugId: string }>()
);
export const relatedTracksSuccess = createAction(
  '[Related Tracks] Related Tracks Successful',
  props<{ relatedTracks: any[], message: string }>()
);
export const relatedTracksError = createAction(
  '[Related Tracks] Related Tracks Error',
  props<{ error: string }>()
);
// add to playlist track slug
export const addToPlaylistTrackSlugTry = createAction(
  '[Add To Playlist Track Slug] Try Add To Playlist Track Slug',
  props<{ addToPlaylistTrackSlug: string | null }>()
);
// add to playlist album slug
export const addToPlaylistAlbumSlugTry = createAction(
  '[Add To Playlist Album Slug] Try Add To Playlist Album Slug',
  props<{ addToPlaylistAlbumSlug: string | null }>()
);
// store comment
export const storeCommentTry = createAction(
  '[Store Comment] Try Store Comment',
  props<{ content: string, commentableType: string, commentableId: string }>()
);
export const storeCommentSuccess = createAction(
  '[Store Comment] Store Comment Successful',
  props<{ message: string }>()
);
export const storeCommentError = createAction(
  '[Store Comment] Store Comment Error',
  props<{ error: string }>()
);
// show comments
export const commentsTry = createAction(
  '[Show Comments] Try Show Comments',
  props<{ commentableType: string, commentableId: string, page: number }>()
);
export const commentsSuccess = createAction(
  '[Show Comments] Show Comments Successful',
  props<{ comments: any, message: string, pagination: Pagination }>()
);
export const commentsError = createAction(
  '[Show Comments] Show Comments Error',
  props<{ error: string }>()
);
// play album
export const playAlbumTry = createAction(
  '[Play Album] Try Play Album',
  props<{ slugId: string }>()
);
export const playAlbumSuccess = createAction(
  '[Play Album] Play Album Successful',
  props<{ tracks: any[], message: string }>()
);
export const playAlbumError = createAction(
  '[Play Album] Play Album Error',
  props<{ error: string }>()
);
// add to now playing album
export const addToNowPlayingAlbumTry = createAction(
  '[Add To Now Playing Album] Try Add To Now Playing Album',
  props<{ slugId: string }>()
);
export const addToNowPlayingAlbumSuccess = createAction(
  '[Add To Now Playing Album] Add To Now Playing Album Successful',
  props<{ tracks: any, message: string }>()
);
export const addToNowPlayingAlbumError = createAction(
  '[Add To Now Playing Album] Add To Now Playing Album Error',
  props<{ error: string }>()
);
// add album to playlist
export const addAlbumToPlaylistTry = createAction(
  '[Add Album To Playlist] Try Add Album To Playlist',
  props<{ albumSlugId: string, playlistId: string | number }>()
);
export const addAlbumToPlaylistSuccess = createAction(
  '[Add Album To Playlist] Add Album To Playlist Successful',
  props<{ message: string }>()
);
export const addAlbumToPlaylistError = createAction(
  '[Add Album To Playlist] Add Album To Playlist Error',
  props<{ error: string }>()
);
// download episode
export const downloadEpisodeTry = createAction(
  '[Download Episode] Try Download Episode',
  props<{ slugId: string }>()
);
export const downloadEpisodeSuccess = createAction(
  '[Download Episode] Download Episode Successful',
  props<{ downloadUrl: string, message: string }>()
);
export const downloadEpisodeError = createAction(
  '[Download Episode] Download Episode Error',
  props<{ error: string }>()
);
// play episode
export const playEpisodeTry = createAction(
  '[Play Episode] Try Play Episode',
  props<{ slugId: string }>()
);
export const playEpisodeSuccess = createAction(
  '[Play Episode] Play Episode Successful',
  props<{ episode: any, message: string }>()
);
export const playEpisodeError = createAction(
  '[Play Episode] Play Episode Error',
  props<{ error: string }>()
);
// play playlist
export const playPlaylistTry = createAction(
  '[Play Playlist] Try Play Playlist',
  props<{ slugId: string }>()
);
export const playPlaylistSuccess = createAction(
  '[Play Playlist] Play Playlist Successful',
  props<{ tracks: any[], message: string }>()
);
export const playPlaylistError = createAction(
  '[Play Playlist] Play Playlist Error',
  props<{ error: string }>()
);
// add to now playing playlist
export const addToNowPlayingPlaylistTry = createAction(
  '[Add To Now Playing Playlist] Try Add To Now Playing Playlist',
  props<{ slugId: string }>()
);
export const addToNowPlayingPlaylistSuccess = createAction(
  '[Add To Now Playing Playlist] Add To Now Playing Playlist Successful',
  props<{ tracks: any, message: string }>()
);
export const addToNowPlayingPlaylistError = createAction(
  '[Add To Now Playing Playlist] Add To Now Playing Playlist Error',
  props<{ error: string }>()
);
// remove playlist
export const removePlaylistTry = createAction(
  '[Remove Playlist] Try Remove Playlist',
  props<{ slugId: string }>()
);
export const removePlaylistSuccess = createAction(
  '[Remove Playlist] Remove Playlist Successful',
  props<{ message: string }>()
);
export const removePlaylistError = createAction(
  '[Remove Playlist] Remove Playlist Error',
  props<{ error: string }>()
);
// update playlist
export const updatePlaylistTry = createAction(
  '[Update Playlist] Try Update Playlist',
  props<{ slugId: string, title: string, playlistType: string, featured: boolean }>()
);
export const updatePlaylistSuccess = createAction(
  '[Update Playlist] Update Playlist Successful',
  props<{ message: string }>()
);
export const updatePlaylistError = createAction(
  '[Update Playlist] Update Playlist Error',
  props<{ error: string }>()
);
// create playlist
export const createPlaylistTry = createAction(
  '[Create Playlist] Try Create Playlist',
  props<{ title: string, playlistType: string, featured: boolean }>()
);
export const createPlaylistSuccess = createAction(
  '[Create Playlist] Create Playlist Successful',
  props<{ message: string }>()
);
export const createPlaylistError = createAction(
  '[Create Playlist] Create Playlist Error',
  props<{ error: string }>()
);
// remove track from playlist
export const removeTrackFromPlaylistTry = createAction(
  '[Remove Track From Playlist] Try Remove Track From Playlist',
  props<{ trackSlugId: string, playlistId: string | number }>()
);
export const removeTrackFromPlaylistSuccess = createAction(
  '[Remove Track From Playlist] Remove Track From Playlist Successful',
  props<{ message: string }>()
);
export const removeTrackFromPlaylistError = createAction(
  '[Remove Track From Playlist] Remove Track From Playlist Error',
  props<{ error: string }>()
);
// featured playlists
export const featuredPlaylistsTry = createAction(
  '[Featured Playlists] Try Featured Playlists',
  props<{ takeNumber: number }>()
);
export const featuredPlaylistsSuccess = createAction(
  '[Featured Playlists] Featured Playlists Successful',
  props<{ message: string, playlists: any[] }>()
);
export const featuredPlaylistsError = createAction(
  '[Featured Playlists] Featured Playlists Error',
  props<{ error: string }>()
);
// playlists
export const playlistsByCategoryTry = createAction(
  '[Playlists By Category] Try Playlists By Category',
  props<{ categorySlug: string, page: number }>()
);
export const playlistsByCategorySuccess = createAction(
  '[Playlists By Category] Playlists By Category Successful',
  props<{ playlists: any[], pagination: Pagination }>()
);
export const playlistsByCategoryError = createAction(
  '[Playlists By Category] Playlists By Category Error',
  props<{ error: string }>()
);
// playlists load more
export const playlistsByCategoryLoadMoreTry = createAction(
  '[Playlists By Category Load more] Try Playlists By Category Load more',
  props<{ categorySlug: string, page: number }>()
);
export const playlistsByCategoryLoadMoreSuccess = createAction(
  '[Playlists By Category Load more] Playlists By Category Load more Successful',
  props<{ playlists: any[], pagination: Pagination }>()
);
export const playlistsByCategoryLoadMoreError = createAction(
  '[Playlists By Category Load more] Playlists By Category Load more Error',
  props<{ error: string }>()
);
// profile public playlists
export const profilePublicPlaylistsTry = createAction(
  '[Profile Public Playlists] Try Profile Public Playlists',
  props<{ username: string }>()
);
export const profilePublicPlaylistsSuccess = createAction(
  '[Profile Public Playlists] Profile Public Playlists Successful',
  props<{ message: string, playlists: any[] }>()
);
export const profilePublicPlaylistsError = createAction(
  '[Profile Public Playlists] Profile Public Playlists Error',
  props<{ error: string }>()
);
// profile followers
export const profileFollowersTry = createAction(
  '[Profile Followers] Try Profile Followers',
  props<{ username: string }>()
);
export const profileFollowersSuccess = createAction(
  '[Profile Followers] Profile Followers Successful',
  props<{ message: string, followers: any[] }>()
);
export const profileFollowersError = createAction(
  '[Profile Followers] Profile Followers Error',
  props<{ error: string }>()
);
// profile followings
export const profileFollowingsTry = createAction(
  '[Profile Followings] Try Profile Followings',
  props<{ username: string }>()
);
export const profileFollowingsSuccess = createAction(
  '[Profile Followings] Profile Followings Successful',
  props<{ message: string, followings: any[] }>()
);
export const profileFollowingsError = createAction(
  '[Profile Followings] Profile Followings Error',
  props<{ error: string }>()
);
// profile all public playlists
export const profileAllPublicPlaylistsTry = createAction(
  '[Profile All Public Playlists] Try Profile All Public Playlists',
  props<{ username: string, page: number }>()
);
export const profileAllPublicPlaylistsSuccess = createAction(
  '[Profile All Public Playlists] Profile All Public Playlists Successful',
  props<{ playlists: any[], pagination: Pagination }>()
);
export const profileAllPublicPlaylistsError = createAction(
  '[Profile All Public Playlists] Profile All Public Playlists Error',
  props<{ error: string }>()
);
// profile load more all public playlists
export const profileLoadMorePublicPlaylistsTry = createAction(
  '[Profile Load More Public Playlists] Try Profile Load More Public Playlists',
  props<{ username: string, page: number }>()
);
export const profileLoadMorePublicPlaylistsSuccess = createAction(
  '[Profile Load More Public Playlists] Profile Load More Public Playlists Successful',
  props<{ playlists: any[], pagination: Pagination }>()
);
export const profileLoadMorePublicPlaylistsError = createAction(
  '[Profile Load More Public Playlists] Profile Load More Public Playlists Error',
  props<{ error: string }>()
);
// profile all followers
export const profileAllFollowersTry = createAction(
  '[Profile All Followers] Try Profile All Followers',
  props<{ username: string, page: number }>()
);
export const profileAllFollowersSuccess = createAction(
  '[Profile All Followers] Profile All Followers Successful',
  props<{ followers: any[], pagination: Pagination }>()
);
export const profileAllFollowersError = createAction(
  '[Profile All Followers] Profile All Followers Error',
  props<{ error: string }>()
);
// profile load more all followers
export const profileLoadMoreAllFollowersTry = createAction(
  '[Profile Load More All Followers] Try Profile Load More All Followers',
  props<{ username: string, page: number }>()
);
export const profileLoadMoreAllFollowersSuccess = createAction(
  '[Profile Load More All Followers] Profile Load More All Followers Successful',
  props<{ followers: any[], pagination: Pagination }>()
);
export const profileLoadMoreAllFollowersError = createAction(
  '[Profile Load More All Followers] Profile Load More All Followers Error',
  props<{ error: string }>()
);
// profile all followings
export const profileAllFollowingsTry = createAction(
  '[Profile All Followings] Try Profile All Followings',
  props<{ username: string, page: number }>()
);
export const profileAllFollowingsSuccess = createAction(
  '[Profile All Followings] Profile All Followings Successful',
  props<{ followings: any[], pagination: Pagination }>()
);
export const profileAllFollowingsError = createAction(
  '[Profile All Followings] Profile All Followings Error',
  props<{ error: string }>()
);
// profile load more all followings
export const profileLoadMoreAllFollowingsTry = createAction(
  '[Profile Load More All Followings] Try Profile Load More All Followings',
  props<{ username: string, page: number }>()
);
export const profileLoadMoreAllFollowingsSuccess = createAction(
  '[Profile Load More All Followings] Profile Load More All Followings Successful',
  props<{ followings: any[], pagination: Pagination }>()
);
export const profileLoadMoreAllFollowingsError = createAction(
  '[Profile Load More All Followings] Profile Load More All Followings Error',
  props<{ error: string }>()
);
// podcasts
export const podcastsTry = createAction(
  '[Podcasts] Try Podcasts',
  props<{ page: number }>()
);
export const podcastsSuccess = createAction(
  '[Podcasts] Podcasts Successful',
  props<{ podcasts: any[], pagination: Pagination }>()
);
export const podcastsError = createAction(
  '[Podcasts] Podcasts Error',
  props<{ error: string }>()
);
// podcasts load more
export const podcastsLoadMoreTry = createAction(
  '[Podcasts Load more] Try Podcasts Load more',
  props<{ page: number }>()
);
export const podcastsLoadMoreSuccess = createAction(
  '[Podcasts Load more] Podcasts Load more Successful',
  props<{ podcasts: any[], pagination: Pagination }>()
);
export const podcastsLoadMoreError = createAction(
  '[Podcasts Load more] Podcasts Load more Error',
  props<{ error: string }>()
);
// charts track
export const chartsTrackTry = createAction(
  '[Charts Track] Try Charts Track',
  props<{ trackType: string, duration: string, sortBy: string }>()
);
export const chartsTrackSuccess = createAction(
  '[Charts Track] Charts Track Successful',
  props<{ tracks: any[], message: string }>()
);
export const chartsTrackError = createAction(
  '[Charts Track] Charts Track Error',
  props<{ error: string }>()
);
// charts track refresh
export const chartsTrackRefreshTry = createAction(
  '[Charts Track Refresh] Try Charts Refresh Track',
  props<{ trackType: string, duration: string, sortBy: string }>()
);
export const chartsTrackRefreshSuccess = createAction(
  '[Charts Track Refresh] Charts Track Refresh Successful',
  props<{ tracks: any[], message: string }>()
);
export const chartsTrackRefreshError = createAction(
  '[Charts Track Refresh] Charts Track Refresh Error',
  props<{ error: string }>()
);
// musics
export const musicsTry = createAction(
  '[Musics Page] Try Musics',
  props<{ musicType: string, genre: string, filter: string, page: number }>()
);
export const musicsSuccess = createAction(
  '[Musics Page] Musics Successful',
  props<{ musics: any[], pagination: Pagination }>()
);
export const musicsError = createAction(
  '[Musics Page] Musics Error',
  props<{ error: string }>()
);
// musics refresh
export const musicsRefreshTry = createAction(
  '[Musics Page Refresh] Try Musics Refresh',
  props<{ musicType: string, genre: string, filter: string, page: number }>()
);
export const musicsRefreshSuccess = createAction(
  '[Musics Page Refresh] Musics Refresh Successful',
  props<{ musics: any[], pagination: Pagination }>()
);
export const musicsRefreshError = createAction(
  '[Musics Page Refresh] Musics Refresh Error',
  props<{ error: string }>()
);
// musics load more
export const musicsLoadMoreTry = createAction(
  '[Musics Load more] Try Musics Load more',
  props<{ musicType: string, genre: string, filter: string, page: number }>()
);
export const musicsLoadMoreSuccess = createAction(
  '[Musics Load more] Musics Load more Successful',
  props<{ musics: any[], pagination: Pagination }>()
);
export const musicsLoadMoreError = createAction(
  '[Musics Load more] Musics Load more Error',
  props<{ error: string }>()
);
// artist take tracks
export const artistTracksTry = createAction(
  '[Artist Tracks] Try Artist Tracks',
  props<{ artistSlugId: string }>()
);
export const artistTracksSuccess = createAction(
  '[Artist Tracks] Artist Tracks Successful',
  props<{ tracks: any[], message: string }>()
);
export const artistTracksError = createAction(
  'Aartist Tracks] Artist Tracks Error',
  props<{ error: string }>()
);
// artist take albums
export const artistAlbumsTry = createAction(
  '[Artist Albums] Try Artist Albums',
  props<{ artistSlugId: string }>()
);
export const artistAlbumsSuccess = createAction(
  '[Artist Albums] Artist Albums Successful',
  props<{ albums: any[], message: string }>()
);
export const artistAlbumsError = createAction(
  '[Artist Albums] Artist Albums Error',
  props<{ error: string }>()
);
// artist take popular plays
export const artistPopularPlaysTracksTry = createAction(
  '[Artist Popular Plays Tracks] Try Artist Popular Tracks',
  props<{ artistSlugId: string }>()
);
export const artistPopularPlaysTracksSuccess = createAction(
  '[Artist Popular Plays Tracks] Artist Popular Plays Tracks Successful',
  props<{ tracks: any[], message: string }>()
);
export const artistPopularPlaysTracksError = createAction(
  '[Artist Popular Plays Tracks] Artist Popular Plays Tracks Error',
  props<{ error: string }>()
);
// artist take popular downloads
export const artistPopularDownloadsTracksTry = createAction(
  '[Artist Popular Downloads Tracks] Try Artist Popular Downloads Tracks',
  props<{ artistSlugId: string }>()
);
export const artistPopularDownloadsTracksSuccess = createAction(
  '[Artist Popular Downloads Tracks] Artist Popular Downloads Tracks Successful',
  props<{ tracks: any[], message: string }>()
);
export const artistPopularDownloadsTracksError = createAction(
  '[Artist Popular Downloads Tracks] Artist Popular Downloads Tracks Error',
  props<{ error: string }>()
);
// artist take popular rates
export const artistPopularRatesTracksTry = createAction(
  '[Artist Popular Rates Tracks] Try Artist Popular Rates Tracks',
  props<{ artistSlugId: string }>()
);
export const artistPopularRatesTracksSuccess = createAction(
  '[Artist Popular Rates Tracks] Artist Popular Rates Tracks Successful',
  props<{ tracks: any[], message: string }>()
);
export const artistPopularRatesTracksError = createAction(
  '[Artist Popular Rates Tracks] Artist Popular Rates Tracks Error',
  props<{ error: string }>()
);
// play artist
export const playArtistTry = createAction(
  '[Play Artist] Try Play Artist',
  props<{ slugId: string }>()
);
export const playArtistSuccess = createAction(
  '[Play Artist] Play Artist Successful',
  props<{ tracks: any[], message: string }>()
);
export const playArtistError = createAction(
  '[Play Artist] Play Artist Error',
  props<{ error: string }>()
);
// add to now playing artist
export const addToNowPlayingArtistTry = createAction(
  '[Add To Now Playing Artist] Try Add To Now Playing Artist',
  props<{ slugId: string }>()
);
export const addToNowPlayingArtistSuccess = createAction(
  '[Add To Now Playing Artist] Add To Now Playing Artist Successful',
  props<{ tracks: any, message: string }>()
);
export const addToNowPlayingArtistError = createAction(
  '[Add To Now Playing Artist] Add To Now Playing Artist Error',
  props<{ error: string }>()
);
// artist all tracks
export const artistAllTracksTry = createAction(
  '[Artist Tracks Page] Try Artist Tracks Page',
  props<{ artistSlugId: string, page: number }>()
);
export const artistAllTracksSuccess = createAction(
  '[Artist Tracks Page] Artist Tracks Page Successful',
  props<{ tracks: any[], pagination: Pagination }>()
);
export const artistAllTracksError = createAction(
  '[Artist Tracks Page] Artist Tracks Page Error',
  props<{ error: string }>()
);
// artist tracks load more
export const artistAllTracksLoadMoreTry = createAction(
  '[Artist All Tracks Load more] Try Artist All Tracks Load more',
  props<{ artistSlugId: string, page: number }>()
);
export const artistAllTracksLoadMoreSuccess = createAction(
  '[Artist All Tracks Load more] Artist All Tracks Load more Successful',
  props<{ tracks: any[], pagination: Pagination }>()
);
export const artistAllTracksLoadMoreError = createAction(
  '[Artist All Tracks Load more] Artist All Tracks Load more Error',
  props<{ error: string }>()
);
// artist all albums
export const artistAllAlbumsTry = createAction(
  '[Artist Albums Page] Try Artist Albums Page',
  props<{ artistSlugId: string, page: number }>()
);
export const artistAllAlbumsSuccess = createAction(
  '[Artist Albums Page] Artist Albums Page Successful',
  props<{ albums: any[], pagination: Pagination }>()
);
export const artistAllAlbumsError = createAction(
  '[Artist Albums Page] Artist Albums Page Error',
  props<{ error: string }>()
);
// artist albums load more
export const artistAllAlbumsLoadMoreTry = createAction(
  '[Artist All Albums Load more] Try Artist All Albums Load more',
  props<{ artistSlugId: string, page: number }>()
);
export const artistAllAlbumsLoadMoreSuccess = createAction(
  '[Artist All Albums Load more] Artist All Albums Load more Successful',
  props<{ albums: any[], pagination: Pagination }>()
);
export const artistAllAlbumsLoadMoreError = createAction(
  '[Artist All Albums Load more] Artist All Albums Load more Error',
  props<{ error: string }>()
);
// artist all musics
export const artistAllMusicsTry = createAction(
  '[Artist Musics Page] Try Artist Musics Page',
  props<{ artistSlug: string, page: number }>()
);
export const artistAllMusicsSuccess = createAction(
  '[Artist Musics Page] Artist Musics Page Successful',
  props<{ musics: any[], pagination: Pagination }>()
);
export const artistAllMusicsError = createAction(
  '[Artist Musics Page] Artist Musics Page Error',
  props<{ error: string }>()
);
// artist musics load more
export const artistAllMusicsLoadMoreTry = createAction(
  '[Artist All Musics Load more] Try Artist All Musics Load more',
  props<{ artistSlug: string, page: number }>()
);
export const artistAllMusicsLoadMoreSuccess = createAction(
  '[Artist All Musics Load more] Artist All Musics Load more Successful',
  props<{ musics: any[], pagination: Pagination }>()
);
export const artistAllMusicsLoadMoreError = createAction(
  '[Artist All Musics Load more] Artist All Musics Load more Error',
  props<{ error: string }>()
);
// recent plays
export const recentPlaysTracksTry = createAction(
  '[Recent Plays Page] Try Recent Plays'
);
export const recentPlaysTracksSuccess = createAction(
  '[Recent Plays Page] Recent Plays Successful',
  props<{ tracks: any[], message: string }>()
);
export const recentPlaysTracksError = createAction(
  '[Recent Plays Page] Recent Plays Error',
  props<{ error: string }>()
);
// my playlists
export const myPlaylistsTry = createAction(
  '[My Playlists Page] Try My Playlists',
  props<{ page: number }>()
);
export const myPlaylistsSuccess = createAction(
  '[My Playlists Page] My Playlists Successful',
  props<{ playlists: any[], pagination: Pagination }>()
);
export const myPlaylistsError = createAction(
  '[My Playlists Page] My Playlists Error',
  props<{ error: string }>()
);
// my playlists load more
export const myPlaylistsLoadMoreTry = createAction(
  '[My Playlists Load more] Try My Playlists Load more',
  props<{ page: number }>()
);
export const myPlaylistsLoadMoreSuccess = createAction(
  '[My Playlists Load more] My Playlists Load more Successful',
  props<{ playlists: any[], pagination: Pagination }>()
);
export const myPlaylistsLoadMoreError = createAction(
  '[My Playlists Load more] My Playlists Load more Error',
  props<{ error: string }>()
);
// my podcasts
export const myPodcastsTry = createAction(
  '[My Podcasts Page] Try My Podcasts',
  props<{ page: number }>()
);
export const myPodcastsSuccess = createAction(
  '[My Podcasts Page] My Podcasts Successful',
  props<{ podcasts: any[], pagination: Pagination }>()
);
export const myPodcastsError = createAction(
  '[My Podcasts Page] My Podcasts Error',
  props<{ error: string }>()
);
// my podcasts load more
export const myPodcastsLoadMoreTry = createAction(
  '[My Podcasts Load more] Try My Podcasts Load more',
  props<{ page: number }>()
);
export const myPodcastsLoadMoreSuccess = createAction(
  '[My Podcasts Load more] My Podcasts Load more Successful',
  props<{ podcasts: any[], pagination: Pagination }>()
);
export const myPodcastsLoadMoreError = createAction(
  '[My Podcasts Load more] My Podcasts Load more Error',
  props<{ error: string }>()
);
// my music
export const myMusicsTry = createAction(
  '[My Musics Page] Try My Musics',
  props<{ page: number }>()
);
export const myMusicsSuccess = createAction(
  '[My Musics Page] My Musics Successful',
  props<{ tracks: any[], pagination: Pagination }>()
);
export const myMusicsError = createAction(
  '[My Musics Page] My Musics Error',
  props<{ error: string }>()
);
// my music load more
export const myMusicsLoadMoreTry = createAction(
  '[My Musics Load more] Try My Musics Load more',
  props<{ page: number }>()
);
export const myMusicsLoadMoreSuccess = createAction(
  '[My Musics Load more] My Musics Load more Successful',
  props<{ tracks: any[], pagination: Pagination }>()
);
export const myMusicsLoadMoreError = createAction(
  '[My Musics Load more] My Musics Load more Error',
  props<{ error: string }>()
);
// remove from player list
export const removeFromPlayerTry = createAction(
  '[Remove From Player] Try Remove From Player',
  props<{ slug: string, id: number }>()
);
export const removeFromPlayerSuccess = createAction(
  '[Remove From Player] Remove From Player Successful',
  props<{ message: string }>()
);
export const removeFromPlayerError = createAction(
  '[Remove From Player] Remove From Player Error',
  props<{ error: string }>()
);
// update now playing
export const updateNowPlayingTry = createAction(
  '[Update Now Playing] Try Update Now Playing',
  props<{
    playable: string,
    slug: string,
    duration: string,
    name: string,
    artist: string,
    url: string,
    cover: string,
    typeTrack: string
  }>()
);
// featured persian tracks
export const featuredPersianTracksTry = createAction(
  '[Featured Persian Tracks] Try Featured Persian Tracks',
);
export const featuredPersianTracksSuccess = createAction(
  '[Featured Persian Tracks] Featured Persian Tracks Successful',
  props<{ tracks: any[], message: string }>()
);
export const featuredPersianTracksError = createAction(
  '[Featured Persian Tracks] Featured Persian Tracks Error',
  props<{ error: string }>()
);
// featured persian albums
export const featuredPersianAlbumsTry = createAction(
  '[Featured Persian Albums] Try Featured Persian Albums',
);
export const featuredPersianAlbumsSuccess = createAction(
  '[Featured Persian Albums] Featured Persian Albums Successful',
  props<{ albums: any[], message: string }>()
);
export const featuredPersianAlbumsError = createAction(
  '[Featured Persian Albums] Featured Persian Albums Error',
  props<{ error: string }>()
);
// featured categories
export const featuredCategoriesTry = createAction(
  '[Featured Categories] Try Featured Categories',
);
export const featuredCategoriesSuccess = createAction(
  '[Featured Categories] Featured Categories Successful',
  props<{ categories: any[], message: string }>()
);
export const featuredCategoriesError = createAction(
  '[Featured Categories] Featured Categories Error',
  props<{ error: string }>()
);
// featured genres
export const featuredGenresTry = createAction(
  '[Featured Genres] Try Featured Genres',
);
export const featuredGenresSuccess = createAction(
  '[Featured Genres] Featured Genres Successful',
  props<{ genres: any[], message: string }>()
);
export const featuredGenresError = createAction(
  '[Featured Genres] Featured Genres Error',
  props<{ error: string }>()
);
// featured podcasts
export const featuredPodcastsTry = createAction(
  '[Featured Podcasts] Try Featured Podcasts',
);
export const featuredPodcastsSuccess = createAction(
  '[Featured Podcasts] Featured Podcasts Successful',
  props<{ podcasts: any[], message: string }>()
);
export const featuredPodcastsError = createAction(
  '[Featured Podcasts] Featured Podcasts Error',
  props<{ error: string }>()
);
// featured playlists
export const featuredPlaylistsDiscoverTry = createAction(
  '[Featured Playlists Discover] Try Featured Playlists Discover',
);
export const featuredPlaylistsDiscoverSuccess = createAction(
  '[Featured Playlists Discover] Featured Playlists Discover Successful',
  props<{ playlists: any[], message: string }>()
);
export const featuredPlaylistsDiscoverError = createAction(
  '[Featured Playlists Discover] Featured Playlists Discover Error',
  props<{ error: string }>()
);
// slider
export const sliderTry = createAction(
  '[Slider Discover] Try Slider Discover',
);
export const sliderSuccess = createAction(
  '[Slider Discover] Slider Discover Successful',
  props<{ sliders: any[], message: string }>()
);
export const sliderError = createAction(
  '[Slider Discover] Slider Discover Error',
  props<{ error: string }>()
);
// featured
export const featuredTry = createAction(
  '[Featured Banner] Try Featured Banner',
);
export const featuredSuccess = createAction(
  '[Featured Banner] Featured Banner Successful',
  props<{ featured: any, message: string }>()
);
export const featuredError = createAction(
  '[Featured Banner] Featured Banner Error',
  props<{ error: string }>()
);
// search
export const searchTry = createAction(
  '[Search Page] Try Search Page',
  props<{ query: string; filter: string, page: number }>()
);
export const searchSuccess = createAction(
  '[Search Page] Search Page Successful',
  props<{ message: string; result: any, pagination: Pagination }>()
);
export const searchError = createAction(
  '[Search Page] Search Page Error',
  props<{ error: string }>()
);
// search load more
export const searchLoadMoreTry = createAction(
  '[Search Load more] Try Search Load more',
  props<{ query: string; filter: string, page: number }>()
);
export const searchLoadMoreSuccess = createAction(
  '[Search Load more] Search Load more Successful',
  props<{ message: string; result: any, pagination: Pagination }>()
);
export const searchLoadMoreError = createAction(
  '[Search Load more] Search Load more Error',
  props<{ error: string }>()
);
