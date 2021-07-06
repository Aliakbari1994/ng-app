import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// modules
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {SharedModule} from "../../shared/shared.module";
import {HomeRoutingModule} from './home-routing.module';
import {NgxPersianModule} from "ngx-persian";
// state
import * as fromHome from './store/home.reducer';
import {HomeEffects} from "./store/home.effects";
// components
import {HomeLayoutComponent} from './layout/home-layout/home-layout.component';
import {HomeTopBarComponent} from './layout/home-top-bar/home-top-bar.component';
import {HomeBottomBarComponent} from './layout/home-bottom-bar/home-bottom-bar.component';
import {HomePlayerComponent} from './layout/home-player/home-player.component';
import {AccountEditComponent} from './pages/account-edit/account-edit.component';
import {HomeGoBackComponent} from './components/home-go-back/home-go-back.component';
import {AccountComponent} from './pages/account/account.component';
import {UserComponent} from './pages/user/user.component';
import {HomeShrinkHeaderComponent} from './components/home-shrink-header/home-shrink-header.component';
import {ArtistComponent} from './pages/artist/artist.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomeGreedyNavComponent} from './components/home-greedy-nav/home-greedy-nav.component';
import {HomeShareComponent} from './components/home-share/home-share.component';
import {TrackComponent} from './pages/track/track.component';
import {AlbumComponent} from './pages/album/album.component';
import {PodcastComponent} from './pages/podcast/podcast.component';
import {PlaylistComponent} from './pages/playlist/playlist.component';
import {PlaylistsComponent} from './pages/playlists/playlists.component';
import {GenresComponent} from './pages/genres/genres.component';
import {CrewComponent} from './pages/crew/crew.component';
import {HomeRelatedCarouselComponent} from './components/home-related-carousel/home-related-carousel.component';
import {HomePlaylistModalComponent} from './components/home-playlist-modal/home-playlist-modal.component';
import {HomeCommentsComponent} from './components/home-comments/home-comments.component';
import {BrowseComponent} from './pages/browse/browse.component';
import {ProfilePlaylistsComponent} from './pages/profile-playlists/profile-playlists.component';
import {ProfileFollowersComponent} from './pages/profile-followers/profile-followers.component';
import {ProfileFollowingsComponent} from './pages/profile-followings/profile-followings.component';
import {PodcastsComponent} from './pages/podcasts/podcasts.component';
import {ChartsComponent} from './pages/charts/charts.component';
import {NowPlayingComponent} from './pages/now-playing/now-playing.component';
import {MusicsComponent} from './pages/musics/musics.component';
import { ArtistTracksComponent } from './pages/artist-tracks/artist-tracks.component';
import { ArtistAlbumsComponent } from './pages/artist-albums/artist-albums.component';
import { RecentPlaysComponent } from './pages/recent-plays/recent-plays.component';
import { MyPlaylistsComponent } from './pages/my-playlists/my-playlists.component';
import { MyPodcastsComponent } from './pages/my-podcasts/my-podcasts.component';
import { MyMusicsComponent } from './pages/my-musics/my-musics.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { HomeDiscoverPersianTracksComponent } from './components/home-discover-persian-tracks/home-discover-persian-tracks.component';
import { HomeDiscoverSliderComponent } from './components/home-discover-slider/home-discover-slider.component';
import { HomeDiscoverPersianAlbumsComponent } from './components/home-discover-persian-albums/home-discover-persian-albums.component';
import { HomeDiscoverFeaturedComponent } from './components/home-discover-featured/home-discover-featured.component';
import { HomeDiscoverCategoriesComponent } from './components/home-discover-categories/home-discover-categories.component';
import { HomeDiscoverGenresComponent } from './components/home-discover-genres/home-discover-genres.component';
import { HomeDiscoverPodcastsComponent } from './components/home-discover-podcasts/home-discover-podcasts.component';
import { HomeDiscoverPlaylistsComponent } from './components/home-discover-playlists/home-discover-playlists.component';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeTopBarComponent,
    HomeBottomBarComponent,
    HomePlayerComponent,
    AccountEditComponent,
    HomeGoBackComponent,
    AccountComponent,
    UserComponent,
    HomeShrinkHeaderComponent,
    ArtistComponent,
    NotFoundComponent,
    HomeGreedyNavComponent,
    HomeShareComponent,
    TrackComponent,
    AlbumComponent,
    PodcastComponent,
    PlaylistComponent,
    PlaylistsComponent,
    GenresComponent,
    CrewComponent,
    HomeRelatedCarouselComponent,
    HomePlaylistModalComponent,
    HomeCommentsComponent,
    BrowseComponent,
    ProfilePlaylistsComponent,
    ProfileFollowersComponent,
    ProfileFollowingsComponent,
    PodcastsComponent,
    ChartsComponent,
    NowPlayingComponent,
    MusicsComponent,
    ArtistTracksComponent,
    ArtistAlbumsComponent,
    RecentPlaysComponent,
    MyPlaylistsComponent,
    MyPodcastsComponent,
    MyMusicsComponent,
    DiscoverComponent,
    HomeDiscoverPersianTracksComponent,
    HomeDiscoverSliderComponent,
    HomeDiscoverPersianAlbumsComponent,
    HomeDiscoverFeaturedComponent,
    HomeDiscoverCategoriesComponent,
    HomeDiscoverGenresComponent,
    HomeDiscoverPodcastsComponent,
    HomeDiscoverPlaylistsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.reducer),
    EffectsModule.forFeature([HomeEffects]),
    NgxPersianModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class HomeModule {
}
