import {Action, createReducer, on} from '@ngrx/store';

import * as fromRoot from "../../../app.state";
import * as HomePageActions from './home.actions';
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

export const homeFeatureKey = 'home';

export interface State extends fromRoot.State {
  loading: boolean;
  buttonLoading: boolean;
  sectionLoading: boolean;
  message: string | null;
  error: string | null;
  uploadImageName: string | null;
  isLoggedIn: boolean;
  currentUser: CurrentUser;
  pagination: Pagination;
  profileData: ProfileData;
  track: Track;
  artist: Artist;
  album: Album;
  albumTracks: AlbumTracks;
  podcast: Podcast;
  podcastEpisodes: PodcastEpisodes,
  playlist: Playlist,
  playlistTracks: PlaylistTracks,
  categories: Categories,
  genres: Genres,
  player: {
    playerLoading: boolean,
    nowPlaying: any,
    tracks: any[],
  },
  relatedTracks: any[],
  addToPlaylistTrackSlug: string | null,
  addToPlaylistAlbumSlug: string | null,
  comments: any[],
  playlists: any[],
  followers: any[],
  followings: any[],
  podcasts: any[],
  tracks: any[],
  musics: any[],
  albums: any[],
  popular: any[],
  featuredPersianTracks: any,
  featuredPersianAlbums: any,
  featuredCategories: any,
  featuredGenres: any,
  featuredPodcasts: any,
  featuredPlaylists: any,
  sliders: any[],
  featured: any,
  searchResult: any,
  nowPlaying: any
}

export const initialState: State = {
  loading: true,
  buttonLoading: false,
  sectionLoading: false,
  message: null,
  error: null,
  uploadImageName: null,
  isLoggedIn: false,
  currentUser: {
    username: null,
    name: null,
    email: null,
    mobile: null,
    avatar: null,
    followers: null,
    followings: null,
    playlists: null,
  },
  pagination: {
    totalItems: 0,
    currentPage: 0,
    pageSize: 0,
  },
  profileData: {
    userId: null,
    userName: null,
    userAvatar: null,
    followersCount: 0,
    followingsCount: 0,
    publicPlaylistsCount: 0,
    followAction: null
  },
  track: {
    thumbnail: null,
    titleFa: '',
    titleEn: '',
    trackRate: 0,
    userRate: 0,
    countVoters: 0,
    explicit: false,
    ownerArtists: [],
    featArtists: [],
    publicationYear: '',
    type: null,
    duration: '',
    plays: '',
    downloads: '',
    genres: [],
    slug: null,
    slugId: null,
    video: {
      title_fa: '',
      title_en: '',
      slug: null,
      slug_id: null,
    },
    accessibility: {
      type: null,
      price: {
        toman: null,
        dollar: null
      }
    },
    support: {
      available: false,
      price: {
        toman: null,
        dollar: null
      }
    },
    publishedAt: null,
    timeNow: null,
    musicArtists: [],
    singerArtists: [],
    instrumentalistArtists: [],
    lyricistArtists: [],
    arrangementArtists: [],
    mixMasterArtists: [],
    lyrics: '',
    keywords: null,
    description: null,
  },
  artist: {
    thumbnail: null,
    nameFa: '',
    nameEn: '',
    type: null,
    tracksCount: 0,
    followersCount: 0,
    plays: 0,
    downloads: 0,
    genres: [],
    slugId: null,
    keywords: null,
    description: null,
    followAction: null,
  },
  album: {
    thumbnail: null,
    titleFa: '',
    titleEn: '',
    albumRate: 0,
    userRate: 0,
    countVoters: 0,
    explicit: false,
    ownerArtists: [],
    featArtists: [],
    publicationYear: '',
    type: null,
    duration: '',
    genres: [],
    slugId: null,
    slug: null,
    accessibility: {
      type: null,
      price: {
        toman: null,
        dollar: null
      }
    },
    support: {
      available: false,
      price: {
        toman: null,
        dollar: null
      }
    },
    publishedAt: null,
    timeNow: null,
    keywords: null,
    description: null,
  },
  albumTracks: {
    tracks: []
  },
  podcast: {
    thumbnail: null,
    titleFa: '',
    titleEn: '',
    owner: '',
    info: '',
    explicit: false,
    followersCount: 0,
    followAction: null,
    slugId: null,
    accessibility: {
      type: null,
      price: {
        toman: null,
        dollar: null
      }
    },
    support: {
      available: false,
      price: {
        toman: null,
        dollar: null
      }
    },
    keywords: null,
    description: null,
  },
  podcastEpisodes: {
    episodes: []
  },
  playlist: {
    thumbnail: null,
    title: '',
    slugId: null,
    type: null,
    featured: false,
    creatorId: '',
    creatorName: '',
    tracksCount: 0,
    duration: '',
    buttonStatus: null,
    keywords: null,
    description: null,
  },
  playlistTracks: {
    tracks: [],
  },
  categories: {
    categories: []
  },
  genres: {
    genres: []
  },
  player: {
    playerLoading: false,
    nowPlaying: null,
    tracks: [],
  },
  relatedTracks: [],
  addToPlaylistTrackSlug: null,
  addToPlaylistAlbumSlug: null,
  comments: [],
  playlists: [],
  followers: [],
  followings: [],
  podcasts: [],
  tracks: [],
  musics: [],
  albums: [],
  popular: [],
  featuredPersianTracks: {
    loading: false,
    tracks: []
  },
  featuredPersianAlbums: {
    loading: false,
    albums: []
  },
  featuredCategories: {
    loading: false,
    categories: []
  },
  featuredGenres: {
    loading: false,
    genres: []
  },
  featuredPodcasts: {
    loading: false,
    podcasts: []
  },
  featuredPlaylists: {
    loading: false,
    playlists: []
  },
  sliders: [],
  featured: {
    loading: false,
    banners: []
  },
  searchResult: {
    loading: false,
    result: []
  },
  nowPlaying: null
}

const homeReducer = createReducer(initialState,
  // remove message
  on(HomePageActions.removeMessageTry, ((state) => ({
      ...state,
      message: null
    }))
  ),
  // remove error
  on(HomePageActions.removeErrorTry, ((state) => ({
      ...state,
      error: null
    }))
  ),
  // send message
  on(HomePageActions.sendMessageTry, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  // send error
  on(HomePageActions.sendErrorTry, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // upload image
  on(HomePageActions.uploadImageTry, ((state, {file, dimensions}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.uploadImageSuccess, ((state, {message, uploadImageName}) => ({
      ...state,
      uploadImageName,
      message
    }))
  ),
  on(HomePageActions.uploadImageError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // check auth
  on(HomePageActions.checkAuthTry, ((state) => ({
      ...state,
      loading: true,
    }))
  ),
  on(HomePageActions.checkAuthSuccess, ((state, {isLoggedIn}) => ({
      ...state,
      isLoggedIn,
      loading: false
    }))
  ),
  on(HomePageActions.checkAuthError, ((state) => ({
      ...state,
      loading: false
    }))
  ),
  // current user
  on(HomePageActions.currentUserTry, ((state) => ({
      ...state,
    }))
  ),
  on(HomePageActions.currentUserSuccess, ((state, {currentUser}) => ({
      ...state,
      currentUser,
      loading: false,
    }))
  ),
  on(HomePageActions.currentUserError, ((state) => ({
      ...state,
      loading: false,
    }))
  ),
  // update avatar
  on(HomePageActions.updateAvatarTry, ((state, {imageName}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.updateAvatarSuccess, ((state, {message}) => ({
      ...state,
      uploadImageName: null,
      message
    }))
  ),
  on(HomePageActions.updateAvatarError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // remove avatar
  on(HomePageActions.removeAvatarTry, ((state) => ({
      ...state,
      buttonLoading: true,
    }))
  ),
  on(HomePageActions.removeAvatarSuccess, ((state, {message}) => ({
      ...state,
      message,
      buttonLoading: false,
    }))
  ),
  on(HomePageActions.removeAvatarError, ((state, {error}) => ({
      ...state,
      error,
      buttonLoading: false,
    }))
  ),
  // update name
  on(HomePageActions.updateNameTry, ((state, {name}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.updateNameSuccess, ((state, {message}) => ({
      ...state,
      message
    }))
  ),
  on(HomePageActions.updateNameError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // update username
  on(HomePageActions.updateUsernameTry, ((state, {username}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.updateUsernameSuccess, ((state, {message}) => ({
      ...state,
      message
    }))
  ),
  on(HomePageActions.updateUsernameError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // update password
  on(HomePageActions.updatePasswordTry, ((state, {password, newPassword}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.updatePasswordSuccess, ((state, {message}) => ({
      ...state,
      message
    }))
  ),
  on(HomePageActions.updatePasswordError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // send update email code
  on(HomePageActions.sendUpdateEmailCodeTry, ((state, {email}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.sendUpdateEmailCodeSuccess, ((state, {message}) => ({
      ...state,
      message
    }))
  ),
  on(HomePageActions.sendUpdateEmailCodeError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // update email
  on(HomePageActions.updateEmailTry, ((state, {email, code}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.updateEmailSuccess, ((state, {message}) => ({
      ...state,
      message
    }))
  ),
  on(HomePageActions.updateEmailError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // send update mobile code
  on(HomePageActions.sendUpdateMobileCodeTry, ((state, {mobile}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.sendUpdateMobileCodeSuccess, ((state, {message}) => ({
      ...state,
      message
    }))
  ),
  on(HomePageActions.sendUpdateMobileCodeError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // update mobile
  on(HomePageActions.updateMobileTry, ((state, {mobile, code}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.updateMobileSuccess, ((state, {message}) => ({
      ...state,
      message
    }))
  ),
  on(HomePageActions.updateMobileError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // deactivate account
  on(HomePageActions.deactivateAccountTry, ((state) => ({
      ...state,
    }))
  ),
  on(HomePageActions.deactivateAccountSuccess, ((state, {message}) => ({
      ...state,
      message,
      currentUser: {
        username: null,
        name: null,
        email: null,
        mobile: null,
        avatar: null,
        followers: null,
        followings: null,
        playlists: null,
      }
    }))
  ),
  on(HomePageActions.deactivateAccountError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // sign out
  on(HomePageActions.signOutTry, ((state) => ({
      ...state,
    }))
  ),
  on(HomePageActions.signOutSuccess, ((state, {message}) => ({
      ...state,
      message,
      currentUser: {
        username: null,
        name: null,
        email: null,
        mobile: null,
        avatar: null,
        followers: null,
        followings: null,
        playlists: null,
      },
      isLoggedIn: false,
    }))
  ),
  on(HomePageActions.signOutError, ((state, {error}) => ({
      ...state,
      error
    }))
  ),
  // profile page
  on(HomePageActions.profilePageTry, ((state, {username}) => ({
      ...state,
      profileData: {
        userId: null,
        userName: null,
        userAvatar: null,
        followersCount: 0,
        followingsCount: 0,
        publicPlaylistsCount: 0,
        followAction: null
      },
      loading: true
    }))
  ),
  on(HomePageActions.profilePageSuccess, ((state, {message, profileData}) => ({
      ...state,
      loading: false,
      message: null,
      profileData
    }))
  ),
  on(HomePageActions.profilePageError, ((state, {error}) => ({
      ...state,
      loading: false,
    }))
  ),
  // profile page Refresh
  on(HomePageActions.profilePageRefreshTry, ((state, {username}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.profilePageRefreshSuccess, ((state, {message, profileData}) => ({
      ...state,
      message: null,
      profileData
    }))
  ),
  on(HomePageActions.profilePageRefreshError, ((state, {error}) => ({
      ...state,
    }))
  ),
  // follow user action
  on(HomePageActions.followUserActionTry, ((state, {username}) => ({
      ...state,
      buttonLoading: true,
    }))
  ),
  on(HomePageActions.followUserActionSuccess, ((state) => ({
      ...state,
      buttonLoading: false,
      message: null,
    }))
  ),
  on(HomePageActions.followUserActionError, ((state, {error}) => ({
      ...state,
      error,
      buttonLoading: false,
    }))
  ),
  // track
  on(HomePageActions.trackTry, ((state, {slugId}) => ({
      ...state,
      loading: true,
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      track: {
        thumbnail: null,
        titleFa: '',
        titleEn: '',
        trackRate: 0,
        userRate: 0,
        countVoters: 0,
        explicit: false,
        ownerArtists: [],
        featArtists: [],
        publicationYear: '',
        type: null,
        duration: '',
        plays: '',
        downloads: '',
        genres: [],
        slug: null,
        slugId: null,
        video: {
          title_fa: '',
          title_en: '',
          slug: null,
          slug_id: null,
        },
        accessibility: {
          type: null,
          price: {
            toman: null,
            dollar: null
          }
        },
        support: {
          available: false,
          price: {
            toman: null,
            dollar: null
          }
        },
        publishedAt: null,
        timeNow: null,
        musicArtists: [],
        singerArtists: [],
        instrumentalistArtists: [],
        lyricistArtists: [],
        arrangementArtists: [],
        mixMasterArtists: [],
        lyrics: '',
        keywords: null,
        description: null,
      },
      comments: []
    }))
  ),
  on(HomePageActions.trackSuccess, ((state, {message, track}) => ({
      ...state,
      loading: false,
      message: null,
      track,
    }))
  ),
  on(HomePageActions.trackError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
  // artist
  on(HomePageActions.artistTry, ((state, {slugId}) => ({
      ...state,
      artist: {
        thumbnail: null,
        nameFa: '',
        nameEn: '',
        type: null,
        tracksCount: 0,
        followersCount: 0,
        plays: 0,
        downloads: 0,
        genres: [],
        slugId: null,
        keywords: null,
        description: null,
        followAction: null,
      },
      loading: true,
    }))
  ),
  on(HomePageActions.artistSuccess, ((state, {message, artist}) => ({
      ...state,
      message: null,
      loading: false,
      artist
    }))
  ),
  on(HomePageActions.artistError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
  // refresh artist
  on(HomePageActions.artistRefreshTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.artistRefreshSuccess, ((state, {message, artist}) => ({
      ...state,
      message: null,
      artist
    }))
  ),
  on(HomePageActions.artistRefreshError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // follow artist action
  on(HomePageActions.followArtistActionTry, ((state, {slugId}) => ({
      ...state,
      buttonLoading: true,
    }))
  ),
  on(HomePageActions.followArtistActionSuccess, ((state) => ({
      ...state,
      buttonLoading: false,
      message: null,
    }))
  ),
  on(HomePageActions.followArtistActionError, ((state, {error}) => ({
      ...state,
      error,
      buttonLoading: false,
    }))
  ),
  // album
  on(HomePageActions.albumTry, ((state, {slugId}) => ({
      ...state,
      loading: true,
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      album: {
        thumbnail: null,
        titleFa: '',
        titleEn: '',
        albumRate: 0,
        userRate: 0,
        countVoters: 0,
        explicit: false,
        ownerArtists: [],
        featArtists: [],
        publicationYear: '',
        type: null,
        duration: '',
        genres: [],
        slugId: null,
        slug: null,
        accessibility: {
          type: null,
          price: {
            toman: null,
            dollar: null
          }
        },
        support: {
          available: false,
          price: {
            toman: null,
            dollar: null
          }
        },
        publishedAt: null,
        timeNow: null,
        keywords: null,
        description: null,
      },
      comments: [],
    }))
  ),
  on(HomePageActions.albumSuccess, ((state, {message, album}) => ({
      ...state,
      message: null,
      loading: false,
      album
    }))
  ),
  on(HomePageActions.albumError, ((state, {error}) => ({
      ...state,
      error,
      loading: false,
    }))
  ),
  // album tracks
  on(HomePageActions.albumTracksTry, ((state, {slugId}) => ({
      ...state,
      sectionLoading: true,
      albumTracks: {
        tracks: []
      }
    }))
  ),
  on(HomePageActions.albumTracksSuccess, ((state, {message, albumTracks}) => ({
      ...state,
      message: null,
      albumTracks,
      sectionLoading: false
    }))
  ),
  on(HomePageActions.albumTracksError, ((state, {error}) => ({
      ...state,
      error,
      sectionLoading: false,
      albumTracks: {
        tracks: []
      }
    }))
  ),
  // podcast
  on(HomePageActions.podcastTry, ((state, {slugId}) => ({
      ...state,
      loading: true,
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      podcast: {
        thumbnail: null,
        titleFa: '',
        titleEn: '',
        owner: '',
        info: '',
        explicit: false,
        followersCount: 0,
        followAction: null,
        slugId: null,
        accessibility: {
          type: null,
          price: {
            toman: null,
            dollar: null
          }
        },
        support: {
          available: false,
          price: {
            toman: null,
            dollar: null
          }
        },
        keywords: null,
        description: null,
      },
      comments: [],
    }))
  ),
  on(HomePageActions.podcastSuccess, ((state, {message, podcast}) => ({
      ...state,
      message: null,
      loading: false,
      podcast
    }))
  ),
  on(HomePageActions.podcastError, ((state, {error}) => ({
      ...state,
      error,
      loading: false,
    }))
  ),
  // podcast refresh
  on(HomePageActions.podcastRefreshTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.podcastRefreshSuccess, ((state, {message, podcast}) => ({
      ...state,
      message: null,
      podcast
    }))
  ),
  on(HomePageActions.podcastRefreshError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // follow podcast action
  on(HomePageActions.followPodcastActionTry, ((state, {slugId}) => ({
      ...state,
      buttonLoading: true,
    }))
  ),
  on(HomePageActions.followPodcastActionSuccess, ((state) => ({
      ...state,
      buttonLoading: false,
      message: null,
    }))
  ),
  on(HomePageActions.followPodcastActionError, ((state, {error}) => ({
      ...state,
      error,
      buttonLoading: false,
    }))
  ),
  // podcast episodes
  on(HomePageActions.podcastEpisodesTry, ((state, {slugId}) => ({
      ...state,
      sectionLoading: true
    }))
  ),
  on(HomePageActions.podcastEpisodesSuccess, ((state, {message, podcastEpisodes}) => ({
      ...state,
      message: null,
      podcastEpisodes,
      sectionLoading: false
    }))
  ),
  on(HomePageActions.podcastEpisodesError, ((state, {error}) => ({
      ...state,
      error,
      sectionLoading: false
    }))
  ),
  // playlist
  on(HomePageActions.playlistTry, ((state, {slugId}) => ({
      ...state,
      loading: true
    }))
  ),
  on(HomePageActions.playlistSuccess, ((state, {message, playlist}) => ({
      ...state,
      message: null,
      playlist,
      loading: false
    }))
  ),
  on(HomePageActions.playlistError, ((state, {error}) => ({
      ...state,
      error,
      loading: false
    }))
  ),
  // playlist refresh
  on(HomePageActions.refreshPlaylistTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.refreshPlaylistSuccess, ((state, {message, playlist}) => ({
      ...state,
      message: null,
      playlist,
    }))
  ),
  on(HomePageActions.refreshPlaylistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // playlist tracks
  on(HomePageActions.playlistTracksTry, ((state, {slugId}) => ({
      ...state,
      sectionLoading: true,
      playlistTracks: {
        tracks: []
      }
    }))
  ),
  on(HomePageActions.playlistTracksSuccess, ((state, {message, playlistTracks}) => ({
      ...state,
      message: null,
      playlistTracks,
      sectionLoading: false
    }))
  ),
  on(HomePageActions.playlistTracksError, ((state, {error}) => ({
      ...state,
      error,
      sectionLoading: false,
      playlistTracks: {
        tracks: []
      }
    }))
  ),
  // playlist categories
  on(HomePageActions.categoriesTry, ((state) => ({
      ...state,
      sectionLoading: true
    }))
  ),
  on(HomePageActions.categoriesSuccess, ((state, {message, categories}) => ({
      ...state,
      message: null,
      categories,
      sectionLoading: false
    }))
  ),
  on(HomePageActions.categoriesError, ((state, {error}) => ({
      ...state,
      error,
      sectionLoading: false
    }))
  ),
  // genres
  on(HomePageActions.genresTry, ((state) => ({
      ...state,
      loading: true,
    }))
  ),
  on(HomePageActions.genresSuccess, ((state, {message, genres}) => ({
      ...state,
      loading: false,
      message: null,
      genres,
    }))
  ),
  on(HomePageActions.genresError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
  // rate track
  on(HomePageActions.rateTrackTry, ((state, {slugId, rate}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.rateTrackSuccess, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  on(HomePageActions.rateTrackError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // rate album
  on(HomePageActions.rateAlbumTry, ((state, {slugId, rate}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.rateAlbumSuccess, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  on(HomePageActions.rateAlbumError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // add track to playlist
  on(HomePageActions.addTrackToPlaylistTry, ((state, {trackSlugId, playlistId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.addTrackToPlaylistSuccess, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  on(HomePageActions.addTrackToPlaylistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // init player
  on(HomePageActions.initPlayerTracksTry, ((state, {tracks}) => ({
      ...state,
      player: {
        playerLoading: false,
        nowPlaying: tracks[0],
        tracks: tracks
      }
    }))
  ),
  // store play
  on(HomePageActions.storePlayTry, ((state, {playable, slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.storePlaySuccess, ((state, {message}) => ({
      ...state,
      message: null,
    }))
  ),
  on(HomePageActions.storePlayError, ((state, {error}) => ({
      ...state,
      error: null,
    }))
  ),
  // play track
  on(HomePageActions.playTrackTry, ((state, {slugId}) => ({
      ...state,
      player: {
        playerLoading: true,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  on(HomePageActions.playTrackSuccess, ((state, {track, message}) => ({
      ...state,
      message: null,
      player: {
        playerLoading: false,
        nowPlaying: track,
        tracks: [track]
      }
    }))
  ),
  on(HomePageActions.playTrackError, ((state, {error}) => ({
      ...state,
      error,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  // add to now playing track
  on(HomePageActions.addToNowPlayingTrackTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.addToNowPlayingTrackSuccess, ((state, {track, message}) => ({
      ...state,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: [...state.player.tracks, track]
      },
      message: null,
    }))
  ),
  on(HomePageActions.addToNowPlayingTrackError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // download track
  on(HomePageActions.downloadTrackTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.downloadTrackSuccess, ((state, {downloadUrl, message}) => ({
      ...state,
      message: null,
    }))
  ),
  on(HomePageActions.downloadTrackError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // related tracks
  on(HomePageActions.relatedTracksTry, ((state, {model, slugId}) => ({
      ...state,
      relatedTracks: []
    }))
  ),
  on(HomePageActions.relatedTracksSuccess, ((state, {relatedTracks, message}) => ({
      ...state,
      message: null,
      relatedTracks
    }))
  ),
  on(HomePageActions.relatedTracksError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // add to playlist track slug
  on(HomePageActions.addToPlaylistTrackSlugTry, ((state, {addToPlaylistTrackSlug}) => ({
      ...state,
      addToPlaylistTrackSlug,
      addToPlaylistAlbumSlug: null,
    }))
  ),
  // add to playlist album slug
  on(HomePageActions.addToPlaylistAlbumSlugTry, ((state, {addToPlaylistAlbumSlug}) => ({
      ...state,
      addToPlaylistAlbumSlug,
      addToPlaylistTrackSlug: null
    }))
  ),
  // store comment
  on(HomePageActions.storeCommentTry, ((state, {content, commentableType, commentableId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.storeCommentSuccess, ((state, {message}) => ({
      ...state,
      message
    }))
  ),
  on(HomePageActions.storeCommentError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // comments
  on(HomePageActions.commentsTry, ((state, {commentableType, commentableId, page}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.commentsSuccess, ((state, {comments, message, pagination}) => ({
      ...state,
      message: null,
      comments: state.comments.length ?
        [...state.comments.values(), ...comments.values()] : comments,
      pagination
    }))
  ),
  on(HomePageActions.commentsError, ((state, {error}) => ({
      ...state,
      error: null,
    }))
  ),
  // play album
  on(HomePageActions.playAlbumTry, ((state, {slugId}) => ({
      ...state,
      player: {
        playerLoading: true,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  on(HomePageActions.playAlbumSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      player: {
        playerLoading: false,
        nowPlaying: tracks[0],
        tracks: tracks
      }
    }))
  ),
  on(HomePageActions.playAlbumError, ((state, {error}) => ({
      ...state,
      error,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  // add to now playing album
  on(HomePageActions.addToNowPlayingAlbumTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.addToNowPlayingAlbumSuccess, ((state, {tracks, message}) => ({
      ...state,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: [...state.player.tracks.values(), ...tracks.values()]
      },
      message: null,
    }))
  ),
  on(HomePageActions.addToNowPlayingAlbumError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // add album to playlist
  on(HomePageActions.addAlbumToPlaylistTry, ((state, {albumSlugId, playlistId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.addAlbumToPlaylistSuccess, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  on(HomePageActions.addAlbumToPlaylistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // download episode
  on(HomePageActions.downloadEpisodeTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.downloadEpisodeSuccess, ((state, {downloadUrl, message}) => ({
      ...state,
      message: null,
    }))
  ),
  on(HomePageActions.downloadEpisodeError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // play episode
  on(HomePageActions.playEpisodeTry, ((state, {slugId}) => ({
      ...state,
      player: {
        playerLoading: true,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  on(HomePageActions.playEpisodeSuccess, ((state, {episode, message}) => ({
      ...state,
      message: null,
      player: {
        playerLoading: false,
        nowPlaying: episode,
        tracks: [episode]
      }
    }))
  ),
  on(HomePageActions.playEpisodeError, ((state, {error}) => ({
      ...state,
      error,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  // play playlist
  on(HomePageActions.playPlaylistTry, ((state, {slugId}) => ({
      ...state,
      player: {
        playerLoading: true,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  on(HomePageActions.playPlaylistSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      player: {
        playerLoading: false,
        nowPlaying: tracks[0],
        tracks: tracks
      }
    }))
  ),
  on(HomePageActions.playPlaylistError, ((state, {error}) => ({
      ...state,
      error,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  // add to now playing podcast
  on(HomePageActions.addToNowPlayingPlaylistTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.addToNowPlayingPlaylistSuccess, ((state, {tracks, message}) => ({
      ...state,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: [...state.player.tracks.values(), ...tracks.values()]
      },
      message: null,
    }))
  ),
  on(HomePageActions.addToNowPlayingPlaylistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // remove playlist
  on(HomePageActions.removePlaylistTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.removePlaylistSuccess, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  on(HomePageActions.removePlaylistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // update playlist
  on(HomePageActions.updatePlaylistTry, ((state, {slugId, title, playlistType, featured}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.updatePlaylistSuccess, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  on(HomePageActions.updatePlaylistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // create playlist
  on(HomePageActions.createPlaylistTry, ((state, {title, playlistType, featured}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.createPlaylistSuccess, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  on(HomePageActions.createPlaylistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // remove track from playlist
  on(HomePageActions.removeTrackFromPlaylistTry, ((state, {trackSlugId, playlistId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.removeTrackFromPlaylistSuccess, ((state, {message}) => ({
      ...state,
      message,
    }))
  ),
  on(HomePageActions.removeTrackFromPlaylistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // featured playlists
  on(HomePageActions.featuredPlaylistsTry, ((state, {takeNumber}) => ({
      ...state,
      loading: true,
      playlists: []
    }))
  ),
  on(HomePageActions.featuredPlaylistsSuccess, ((state, {message, playlists}) => ({
      ...state,
      message: null,
      loading: false,
      playlists
    }))
  ),
  on(HomePageActions.featuredPlaylistsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
  // playlists
  on(HomePageActions.playlistsByCategoryTry, ((state, {categorySlug, page}) => ({
      ...state,
      playlists: [],
      loading: true
    }))
  ),
  on(HomePageActions.playlistsByCategorySuccess, ((state, {playlists, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      playlists: playlists,
      pagination
    }))
  ),
  on(HomePageActions.playlistsByCategoryError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // load more playlists
  on(HomePageActions.playlistsByCategoryLoadMoreTry, ((state, {categorySlug, page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.playlistsByCategoryLoadMoreSuccess, ((state, {playlists, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      playlists: state.playlists.length ?
        [...state.playlists.values(), ...playlists.values()] : playlists,
      pagination
    }))
  ),
  on(HomePageActions.playlistsByCategoryLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // profile public playlists
  on(HomePageActions.profilePublicPlaylistsTry, ((state, {username}) => ({
      ...state,
      sectionLoading: true,
      playlists: []
    }))
  ),
  on(HomePageActions.profilePublicPlaylistsSuccess, ((state, {message, playlists}) => ({
      ...state,
      message: null,
      sectionLoading: false,
      playlists
    }))
  ),
  on(HomePageActions.profilePublicPlaylistsError, ((state, {error}) => ({
      ...state,
      sectionLoading: false,
      error,
    }))
  ),
  // profile followers
  on(HomePageActions.profileFollowersTry, ((state, {username}) => ({
      ...state,
      followers: []
    }))
  ),
  on(HomePageActions.profileFollowersSuccess, ((state, {message, followers}) => ({
      ...state,
      message: null,
      followers
    }))
  ),
  on(HomePageActions.profileFollowersError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // profile followings
  on(HomePageActions.profileFollowingsTry, ((state, {username}) => ({
      ...state,
      followings: []
    }))
  ),
  on(HomePageActions.profileFollowingsSuccess, ((state, {message, followings}) => ({
      ...state,
      message: null,
      followings
    }))
  ),
  on(HomePageActions.profileFollowingsError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // profile public playlists
  on(HomePageActions.profileAllPublicPlaylistsTry, ((state, {username, page}) => ({
      ...state,
      loading: true,
      playlists: []
    }))
  ),
  on(HomePageActions.profileAllPublicPlaylistsSuccess, ((state, {playlists, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      pagination,
      playlists,
    }))
  ),
  on(HomePageActions.profileAllPublicPlaylistsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
  // profile load more public playlists
  on(HomePageActions.profileLoadMorePublicPlaylistsTry, ((state, {username, page}) => ({
      ...state,
      buttonLoading: true,
    }))
  ),
  on(HomePageActions.profileLoadMorePublicPlaylistsSuccess, ((state, {playlists, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      playlists: state.playlists.length ?
        [...state.playlists.values(), ...playlists.values()] : playlists,
      pagination
    }))
  ),
  on(HomePageActions.profileLoadMorePublicPlaylistsError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error,
    }))
  ),
  // profile all followers
  on(HomePageActions.profileAllFollowersTry, ((state, {username, page}) => ({
      ...state,
      loading: true,
      followers: []
    }))
  ),
  on(HomePageActions.profileAllFollowersSuccess, ((state, {followers, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      pagination,
      followers,
    }))
  ),
  on(HomePageActions.profileAllFollowersError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
  // profile load more all followers
  on(HomePageActions.profileLoadMoreAllFollowersTry, ((state, {username, page}) => ({
      ...state,
      buttonLoading: true,
    }))
  ),
  on(HomePageActions.profileLoadMoreAllFollowersSuccess, ((state, {followers, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      followers: state.followers.length ?
        [...state.followers.values(), ...followers.values()] : followers,
      pagination
    }))
  ),
  on(HomePageActions.profileLoadMoreAllFollowersError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error,
    }))
  ),
  // profile all followings
  on(HomePageActions.profileAllFollowingsTry, ((state, {username, page}) => ({
      ...state,
      loading: true,
      followings: []
    }))
  ),
  on(HomePageActions.profileAllFollowingsSuccess, ((state, {followings, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      pagination,
      followings,
    }))
  ),
  on(HomePageActions.profileAllFollowingsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
  // profile load more all followings
  on(HomePageActions.profileLoadMoreAllFollowingsTry, ((state, {username, page}) => ({
      ...state,
      buttonLoading: true,
    }))
  ),
  on(HomePageActions.profileLoadMoreAllFollowingsSuccess, ((state, {followings, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      followings: state.followings.length ?
        [...state.followings.values(), ...followings.values()] : followings,
      pagination
    }))
  ),
  on(HomePageActions.profileLoadMoreAllFollowingsError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error,
    }))
  ),
  // podcasts
  on(HomePageActions.podcastsTry, ((state, {page}) => ({
      ...state,
      podcasts: [],
      loading: true
    }))
  ),
  on(HomePageActions.podcastsSuccess, ((state, {podcasts, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      podcasts: podcasts,
      pagination
    }))
  ),
  on(HomePageActions.podcastsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // load more podcasts
  on(HomePageActions.podcastsLoadMoreTry, ((state, {page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.podcastsLoadMoreSuccess, ((state, {podcasts, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      podcasts: state.podcasts.length ?
        [...state.podcasts.values(), ...podcasts.values()] : podcasts,
      pagination
    }))
  ),
  on(HomePageActions.podcastsLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // Charts Tracks
  on(HomePageActions.chartsTrackTry, ((state, {trackType, duration, sortBy}) => ({
      ...state,
      loading: true
    }))
  ),
  on(HomePageActions.chartsTrackSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      loading: false,
      tracks
    }))
  ),
  on(HomePageActions.chartsTrackError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // Charts Tracks Refresh
  on(HomePageActions.chartsTrackRefreshTry, ((state, {trackType, duration, sortBy}) => ({
      ...state,
      sectionLoading: true
    }))
  ),
  on(HomePageActions.chartsTrackRefreshSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      sectionLoading: false,
      tracks
    }))
  ),
  on(HomePageActions.chartsTrackRefreshError, ((state, {error}) => ({
      ...state,
      sectionLoading: false,
      error: null,
    }))
  ),
  // musics
  on(HomePageActions.musicsTry, ((state, {musicType, genre, filter, page}) => ({
      ...state,
      musics: [],
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      loading: true
    }))
  ),
  on(HomePageActions.musicsSuccess, ((state, {musics, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      musics,
      pagination
    }))
  ),
  on(HomePageActions.musicsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // musics refresh
  on(HomePageActions.musicsRefreshTry, ((state, {musicType, genre, filter, page}) => ({
      ...state,
      musics: [],
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      sectionLoading: true
    }))
  ),
  on(HomePageActions.musicsRefreshSuccess, ((state, {musics, pagination}) => ({
      ...state,
      message: null,
      sectionLoading: false,
      musics,
      pagination
    }))
  ),
  on(HomePageActions.musicsRefreshError, ((state, {error}) => ({
      ...state,
      sectionLoading: false,
      error: null,
    }))
  ),
  // load more musics
  on(HomePageActions.musicsLoadMoreTry, ((state, {musicType, genre, filter, page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.musicsLoadMoreSuccess, ((state, {musics, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      musics: state.musics.length ?
        [...state.musics.values(), ...musics.values()] : musics,
      pagination
    }))
  ),
  on(HomePageActions.musicsLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // artist take tracks
  on(HomePageActions.artistTracksTry, ((state, {artistSlugId}) => ({
      ...state,
      tracks: []
    }))
  ),
  on(HomePageActions.artistTracksSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      tracks
    }))
  ),
  on(HomePageActions.artistTracksError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // artist take albums
  on(HomePageActions.artistAlbumsTry, ((state, {artistSlugId}) => ({
      ...state,
      albums: []
    }))
  ),
  on(HomePageActions.artistAlbumsSuccess, ((state, {albums, message}) => ({
      ...state,
      message: null,
      albums
    }))
  ),
  on(HomePageActions.artistAlbumsError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // artist take popular plays tracks
  on(HomePageActions.artistPopularPlaysTracksTry, ((state, {artistSlugId}) => ({
      ...state,
      sectionLoading: true,
      popular: []
    }))
  ),
  on(HomePageActions.artistPopularPlaysTracksSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      popular: tracks,
      sectionLoading: false,
    }))
  ),
  on(HomePageActions.artistPopularPlaysTracksError, ((state, {error}) => ({
      ...state,
      error,
      sectionLoading: false,
    }))
  ),
  // artist take popular downloads tracks
  on(HomePageActions.artistPopularDownloadsTracksTry, ((state, {artistSlugId}) => ({
      ...state,
      sectionLoading: true,
      popular: []
    }))
  ),
  on(HomePageActions.artistPopularDownloadsTracksSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      popular: tracks,
      sectionLoading: false,
    }))
  ),
  on(HomePageActions.artistPopularDownloadsTracksError, ((state, {error}) => ({
      ...state,
      error,
      sectionLoading: false,
    }))
  ),
  // artist take popular rates tracks
  on(HomePageActions.artistPopularRatesTracksTry, ((state, {artistSlugId}) => ({
      ...state,
      sectionLoading: true,
      popular: []
    }))
  ),
  on(HomePageActions.artistPopularRatesTracksSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      popular: tracks,
      sectionLoading: false,
    }))
  ),
  on(HomePageActions.artistPopularRatesTracksError, ((state, {error}) => ({
      ...state,
      error,
      sectionLoading: false,
    }))
  ),
  // play artist
  on(HomePageActions.playArtistTry, ((state, {slugId}) => ({
      ...state,
      player: {
        playerLoading: true,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  on(HomePageActions.playArtistSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      player: {
        playerLoading: false,
        nowPlaying: tracks[0],
        tracks: tracks
      }
    }))
  ),
  on(HomePageActions.playArtistError, ((state, {error}) => ({
      ...state,
      error,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: state.player.tracks
      }
    }))
  ),
  // add to now playing artist
  on(HomePageActions.addToNowPlayingArtistTry, ((state, {slugId}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.addToNowPlayingArtistSuccess, ((state, {tracks, message}) => ({
      ...state,
      player: {
        playerLoading: false,
        nowPlaying: state.player.nowPlaying,
        tracks: [...state.player.tracks.values(), ...tracks.values()]
      },
      message: null,
    }))
  ),
  on(HomePageActions.addToNowPlayingArtistError, ((state, {error}) => ({
      ...state,
      error,
    }))
  ),
  // artist all tracks
  on(HomePageActions.artistAllTracksTry, ((state, {artistSlugId, page}) => ({
      ...state,
      tracks: [],
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      loading: true
    }))
  ),
  on(HomePageActions.artistAllTracksSuccess, ((state, {tracks, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      tracks,
      pagination
    }))
  ),
  on(HomePageActions.artistAllTracksError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // load more artist tracks
  on(HomePageActions.artistAllTracksLoadMoreTry, ((state, {artistSlugId, page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.artistAllTracksLoadMoreSuccess, ((state, {tracks, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      tracks: state.tracks.length ?
        [...state.tracks.values(), ...tracks.values()] : tracks,
      pagination
    }))
  ),
  on(HomePageActions.artistAllTracksLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // artist all albums
  on(HomePageActions.artistAllAlbumsTry, ((state, {artistSlugId, page}) => ({
      ...state,
      albums: [],
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      loading: true
    }))
  ),
  on(HomePageActions.artistAllAlbumsSuccess, ((state, {albums, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      albums,
      pagination
    }))
  ),
  on(HomePageActions.artistAllAlbumsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // load more artist albums
  on(HomePageActions.artistAllAlbumsLoadMoreTry, ((state, {artistSlugId, page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.artistAllAlbumsLoadMoreSuccess, ((state, {albums, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      albums: state.albums.length ?
        [...state.albums.values(), ...albums.values()] : albums,
      pagination
    }))
  ),
  on(HomePageActions.artistAllAlbumsLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // artist all musics
  on(HomePageActions.artistAllMusicsTry, ((state, {artistSlug, page}) => ({
      ...state,
      artistName: null,
      musics: [],
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      loading: true
    }))
  ),
  on(HomePageActions.artistAllMusicsSuccess, ((state, {musics, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      musics,
      pagination
    }))
  ),
  on(HomePageActions.artistAllMusicsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // load more artist musics
  on(HomePageActions.artistAllMusicsLoadMoreTry, ((state, {artistSlug, page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.artistAllMusicsLoadMoreSuccess, ((state, {musics, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      musics: state.musics.length ?
        [...state.musics.values(), ...musics.values()] : musics,
      pagination
    }))
  ),
  on(HomePageActions.artistAllMusicsLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // recent plays
  on(HomePageActions.recentPlaysTracksTry, ((state) => ({
      ...state,
      tracks: [],
      loading: true
    }))
  ),
  on(HomePageActions.recentPlaysTracksSuccess, ((state, {tracks}) => ({
      ...state,
      message: null,
      loading: false,
      tracks,
    }))
  ),
  on(HomePageActions.recentPlaysTracksError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // my playlists
  on(HomePageActions.myPlaylistsTry, ((state, {page}) => ({
      ...state,
      playlists: [],
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      loading: true
    }))
  ),
  on(HomePageActions.myPlaylistsSuccess, ((state, {playlists, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      playlists,
      pagination
    }))
  ),
  on(HomePageActions.myPlaylistsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // my playlists load more
  on(HomePageActions.myPlaylistsLoadMoreTry, ((state, {page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.myPlaylistsLoadMoreSuccess, ((state, {playlists, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      playlists: state.playlists.length ?
        [...state.playlists.values(), ...playlists.values()] : playlists,
      pagination
    }))
  ),
  on(HomePageActions.myPlaylistsLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // my podcasts
  on(HomePageActions.myPodcastsTry, ((state, {page}) => ({
      ...state,
      podcasts: [],
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      loading: true
    }))
  ),
  on(HomePageActions.myPodcastsSuccess, ((state, {podcasts, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      podcasts,
      pagination
    }))
  ),
  on(HomePageActions.myPodcastsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // my podcasts load more
  on(HomePageActions.myPodcastsLoadMoreTry, ((state, {page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.myPodcastsLoadMoreSuccess, ((state, {podcasts, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      podcasts: state.podcasts.length ?
        [...state.podcasts.values(), ...podcasts.values()] : podcasts,
      pagination
    }))
  ),
  on(HomePageActions.myPodcastsLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // my musics
  on(HomePageActions.myMusicsTry, ((state, {page}) => ({
      ...state,
      tracks: [],
      pagination: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
      },
      loading: true
    }))
  ),
  on(HomePageActions.myMusicsSuccess, ((state, {tracks, pagination}) => ({
      ...state,
      message: null,
      loading: false,
      tracks,
      pagination
    }))
  ),
  on(HomePageActions.myMusicsError, ((state, {error}) => ({
      ...state,
      loading: false,
      error: null,
    }))
  ),
  // my musics load more
  on(HomePageActions.myMusicsLoadMoreTry, ((state, {page}) => ({
      ...state,
      buttonLoading: true
    }))
  ),
  on(HomePageActions.myMusicsLoadMoreSuccess, ((state, {tracks, pagination}) => ({
      ...state,
      message: null,
      buttonLoading: false,
      tracks: state.tracks.length ?
        [...state.tracks.values(), ...tracks.values()] : tracks,
      pagination
    }))
  ),
  on(HomePageActions.myMusicsLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
    }))
  ),
  // remove from player
  on(HomePageActions.removeFromPlayerTry, ((state, {slug, id}) => ({
      ...state,
    }))
  ),
  on(HomePageActions.removeFromPlayerSuccess, ((state, {message}) => ({
      ...state,
      message: null,
    }))
  ),
  on(HomePageActions.removeFromPlayerError, ((state, {error}) => ({
      ...state,
      error: null,
    }))
  ),
  // update now playing
  on(HomePageActions.updateNowPlayingTry, ((state, {
      playable,
      slug,
      duration,
      name,
      artist,
      url,
      cover,
      typeTrack
    }) => ({
      ...state,
    nowPlaying: {
      playable,
      slug,
      duration,
      name,
      artist,
      url,
      cover,
      type: typeTrack
    },
      // player: {
      //   playerLoading: false,
      //   nowPlaying: {
      //     playable,
      //     slug,
      //     duration,
      //     name,
      //     artist,
      //     url,
      //     cover,
      //     type: typeTrack
      //   },
      //   tracks: [...state.player.tracks.values()]
      // }
    }))
  ),
  // featured persian tracks
  on(HomePageActions.featuredPersianTracksTry, ((state) => ({
      ...state,
      featuredPersianTracks: {
        loading: true,
        tracks: []
      }
    }))
  ),
  on(HomePageActions.featuredPersianTracksSuccess, ((state, {tracks, message}) => ({
      ...state,
      message: null,
      featuredPersianTracks: {
        loading: false,
        tracks: tracks
      }
    }))
  ),
  on(HomePageActions.featuredPersianTracksError, ((state, {error}) => ({
      ...state,
      error,
      featuredPersianTracks: {
        loading: false,
        tracks: []
      }
    }))
  ),
  // featured persian albums
  on(HomePageActions.featuredPersianAlbumsTry, ((state) => ({
      ...state,
      featuredPersianAlbums: {
        loading: true,
        albums: []
      }
    }))
  ),
  on(HomePageActions.featuredPersianAlbumsSuccess, ((state, {albums, message}) => ({
      ...state,
      message: null,
      featuredPersianAlbums: {
        loading: false,
        albums: albums
      }
    }))
  ),
  on(HomePageActions.featuredPersianAlbumsError, ((state, {error}) => ({
      ...state,
      error,
      featuredPersianAlbums: {
        loading: false,
        albums: []
      }
    }))
  ),
  // featured categories
  on(HomePageActions.featuredCategoriesTry, ((state) => ({
      ...state,
      featuredCategories: {
        loading: true,
        categories: []
      }
    }))
  ),
  on(HomePageActions.featuredCategoriesSuccess, ((state, {categories, message}) => ({
      ...state,
      message: null,
      featuredCategories: {
        loading: false,
        categories: categories
      }
    }))
  ),
  on(HomePageActions.featuredCategoriesError, ((state, {error}) => ({
      ...state,
      error,
      featuredCategories: {
        loading: false,
        categories: []
      }
    }))
  ),
  // featured genres
  on(HomePageActions.featuredGenresTry, ((state) => ({
      ...state,
      featuredGenres: {
        loading: true,
        genres: []
      }
    }))
  ),
  on(HomePageActions.featuredGenresSuccess, ((state, {genres, message}) => ({
      ...state,
      message: null,
      featuredGenres: {
        loading: false,
        genres: genres
      }
    }))
  ),
  on(HomePageActions.featuredGenresError, ((state, {error}) => ({
      ...state,
      error,
      featuredGenres: {
        loading: false,
        genres: []
      }
    }))
  ),
  // featured podcasts
  on(HomePageActions.featuredPodcastsTry, ((state) => ({
      ...state,
      featuredPodcasts: {
        loading: true,
        podcasts: []
      }
    }))
  ),
  on(HomePageActions.featuredPodcastsSuccess, ((state, {podcasts, message}) => ({
      ...state,
      message: null,
      featuredPodcasts: {
        loading: false,
        podcasts: podcasts
      }
    }))
  ),
  on(HomePageActions.featuredPodcastsError, ((state, {error}) => ({
      ...state,
      error,
      featuredPodcasts: {
        loading: false,
        podcasts: []
      }
    }))
  ),
  // featured playlists
  on(HomePageActions.featuredPlaylistsDiscoverTry, ((state) => ({
      ...state,
      featuredPlaylists: {
        loading: true,
        playlists: []
      }
    }))
  ),
  on(HomePageActions.featuredPlaylistsDiscoverSuccess, ((state, {playlists, message}) => ({
      ...state,
      message: null,
      featuredPlaylists: {
        loading: false,
        playlists: playlists
      }
    }))
  ),
  on(HomePageActions.featuredPlaylistsDiscoverError, ((state, {error}) => ({
      ...state,
      error,
      featuredPlaylists: {
        loading: false,
        playlists: []
      }
    }))
  ),
  // sliders
  on(HomePageActions.sliderTry, ((state) => ({
      ...state,
      loading: true
    }))
  ),
  on(HomePageActions.sliderSuccess, ((state, {sliders, message}) => ({
      ...state,
      message: null,
      loading: false,
      sliders,
    }))
  ),
  on(HomePageActions.sliderError, ((state, {error}) => ({
      ...state,
      error,
      loading: false,
    }))
  ),
  // featured
  on(HomePageActions.featuredTry, ((state) => ({
      ...state,
      featured: {
        loading: true,
        banners: []
      }
    }))
  ),
  on(HomePageActions.featuredSuccess, ((state, {featured, message}) => ({
      ...state,
      message: null,
      featured: {
        loading: false,
        banners: featured
      }
    }))
  ),
  on(HomePageActions.featuredError, ((state, {error}) => ({
      ...state,
      error,
      featured: {
        loading: false,
        banners: []
      }
    }))
  ),
  // search
  on(HomePageActions.searchTry, ((state, {query, filter, page}) => ({
      ...state,
      searchResult: {
        loading: true,
        pagination: {
          totalItems: 0,
          currentPage: 0,
          pageSize: 0,
        },
        result: []
      }
    }))
  ),
  on(HomePageActions.searchSuccess, ((state, {message, result, pagination}) => ({
      ...state,
      message: null,
      pagination,
      searchResult: {
        loading: false,
        result: result
      }
    }))
  ),
  on(HomePageActions.searchError, ((state, {error}) => ({
      ...state,
      error: null,
      searchResult: {
        loading: false,
        result: []
      }
    }))
  ),
  // load more search
  on(HomePageActions.searchLoadMoreTry, ((state, {query, filter, page}) => ({
      ...state,
      buttonLoading: true,
    }))
  ),
  on(HomePageActions.searchLoadMoreSuccess, ((state, {message, result, pagination}) => ({
      ...state,
      buttonLoading: false,
      message: null,
      pagination,
      searchResult: {
        loading: false,
        result: [...state.searchResult.result.values(), ...result.values()]
      }
    }))
  ),
  on(HomePageActions.searchLoadMoreError, ((state, {error}) => ({
      ...state,
      buttonLoading: false,
      error: null,
      searchResult: {
        loading: false,
        result: state.searchResult.result
      }
    }))
  ),
)

export function reducer(state: State, action: Action): State {
  return homeReducer(state, action) as State;
}
