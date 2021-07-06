import {createSelector, createFeatureSelector} from '@ngrx/store';

import {State, homeFeatureKey} from './home.reducer';

export const selectFeature = createFeatureSelector<State>(homeFeatureKey);

// main selectors
export const selectHomeLoading = createSelector(selectFeature, (state: State) => state.loading);
export const selectHomeButtonLoading = createSelector(selectFeature, (state: State) => state.buttonLoading);
export const selectHomeSectionLoading = createSelector(selectFeature, (state: State) => state.sectionLoading);
export const selectHomeMessage = createSelector(selectFeature, (state: State) => state.message);
export const selectHomeError = createSelector(selectFeature, (state: State) => state.error);
export const selectHomeUploadImageName = createSelector(selectFeature, (state: State) => state.uploadImageName);
// check auth
export const selectHomeCheckAuth = createSelector(selectFeature, (state: State) => state.isLoggedIn);
// current user
export const selectHomeCurrentUser = createSelector(selectFeature, (state: State) => state.currentUser);
// profile page data
export const selectHomeProfilePageData = createSelector(selectFeature, (state: State) => state.profileData);
// track
export const selectHomeTrack = createSelector(selectFeature, (state: State) => state.track);
// artist
export const selectHomeArtist = createSelector(selectFeature, (state: State) => state.artist);
// album
export const selectHomeAlbum = createSelector(selectFeature, (state: State) => state.album);
// album tracks
export const selectHomeAlbumTracks = createSelector(selectFeature, (state: State) => state.albumTracks);
// podcast
export const selectHomePodcast = createSelector(selectFeature, (state: State) => state.podcast);
// podcast episodes
export const selectHomePodcastEpisodes = createSelector(selectFeature, (state: State) => state.podcastEpisodes);
// playlist
export const selectHomePlaylist = createSelector(selectFeature, (state: State) => state.playlist);
// playlist tracks
export const selectHomePlaylistTracks = createSelector(selectFeature, (state: State) => state.playlistTracks);
// playlist categories
export const selectHomeCategories = createSelector(selectFeature, (state: State) => state.categories);
// genres
export const selectHomeGenres = createSelector(selectFeature, (state: State) => state.genres);
// player
export const selectHomePlayer = createSelector(selectFeature, (state: State) => state.player);
// related tracks
export const selectHomeRelatedTracks = createSelector(selectFeature, (state: State) => state.relatedTracks);
// add to playlist track slug
export const selectHomeAddToPlaylistTrackSlug = createSelector(selectFeature, (state: State) => state.addToPlaylistTrackSlug);
// add to playlist album slug
export const selectHomeAddToPlaylistAlbumSlug = createSelector(selectFeature, (state: State) => state.addToPlaylistAlbumSlug);
// comments
export const selectHomeComments = createSelector(selectFeature, (state: State) => state.comments);
// pagination
export const selectHomePagination = createSelector(selectFeature, (state: State) => state.pagination);
// now playing
export const selectHomeNowPlaying = createSelector(selectFeature, (state: State) => state.player.nowPlaying);
// playlists
export const selectHomePlaylists = createSelector(selectFeature, (state: State) => state.playlists);
// followers
export const selectHomeFollowers = createSelector(selectFeature, (state: State) => state.followers);
// followings
export const selectHomeFollowings = createSelector(selectFeature, (state: State) => state.followings);
// podcasts
export const selectHomePodcasts = createSelector(selectFeature, (state: State) => state.podcasts);
// tracks
export const selectHomeTracks = createSelector(selectFeature, (state: State) => state.tracks);
// musics
export const selectHomeMusics = createSelector(selectFeature, (state: State) => state.musics);
// albums
export const selectHomeAlbums = createSelector(selectFeature, (state: State) => state.albums);
// populars
export const selectHomePopular = createSelector(selectFeature, (state: State) => state.popular);
// featured
export const selectFeaturedPersianTracks = createSelector(selectFeature, (state: State) => state.featuredPersianTracks);
export const selectFeaturedPersianAlbums = createSelector(selectFeature, (state: State) => state.featuredPersianAlbums);
export const selectFeaturedCategories = createSelector(selectFeature, (state: State) => state.featuredCategories);
export const selectFeaturedGenres = createSelector(selectFeature, (state: State) => state.featuredGenres);
export const selectFeaturedPodcasts = createSelector(selectFeature, (state: State) => state.featuredPodcasts);
export const selectFeaturedPlaylists = createSelector(selectFeature, (state: State) => state.featuredPlaylists);
export const selectHomeFeatured = createSelector(selectFeature, (state: State) => state.featured);
// slider
export const selectHomeSlider = createSelector(selectFeature, (state: State) => state.sliders);
// search
export const selectHomeSearch = createSelector(selectFeature, (state: State) => state.searchResult);
// now playing
export const selectHomePlayerNowPlaying = createSelector(selectFeature, (state: State) => state.nowPlaying);
