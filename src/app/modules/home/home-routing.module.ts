import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// guards and resolvers
import {AuthGuard} from "../../core/guards/auth/auth.guard";
// components
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";
import {AccountEditComponent} from "./pages/account-edit/account-edit.component";
import {AccountComponent} from "./pages/account/account.component";
import {UserComponent} from "./pages/user/user.component";
import {ArtistComponent} from "./pages/artist/artist.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {TrackComponent} from "./pages/track/track.component";
import {AlbumComponent} from "./pages/album/album.component";
import {PodcastComponent} from "./pages/podcast/podcast.component";
import {PlaylistComponent} from "./pages/playlist/playlist.component";
import {PlaylistsComponent} from "./pages/playlists/playlists.component";
import {GenresComponent} from "./pages/genres/genres.component";
import {CrewComponent} from "./pages/crew/crew.component";
import {BrowseComponent} from "./pages/browse/browse.component";
import {ProfilePlaylistsComponent} from "./pages/profile-playlists/profile-playlists.component";
import {ProfileFollowersComponent} from "./pages/profile-followers/profile-followers.component";
import {ProfileFollowingsComponent} from "./pages/profile-followings/profile-followings.component";
import {PodcastsComponent} from "./pages/podcasts/podcasts.component";
import {ChartsComponent} from "./pages/charts/charts.component";
import {NowPlayingComponent} from "./pages/now-playing/now-playing.component";
import {MusicsComponent} from "./pages/musics/musics.component";
import {ArtistTracksComponent} from "./pages/artist-tracks/artist-tracks.component";
import {ArtistAlbumsComponent} from "./pages/artist-albums/artist-albums.component";
import {RecentPlaysComponent} from "./pages/recent-plays/recent-plays.component";
import {MyPlaylistsComponent} from "./pages/my-playlists/my-playlists.component";
import {MyPodcastsComponent} from "./pages/my-podcasts/my-podcasts.component";
import {MyMusicsComponent} from "./pages/my-musics/my-musics.component";
import {DiscoverComponent} from "./pages/discover/discover.component";
import {SearchComponent} from "./pages/search/search.component";


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    pathMatch: 'prefix',
    children: [
      {path: '', component: DiscoverComponent},
      {path: 'user/:id', component: UserComponent},
      {path: 'user/:id/playlists', component: ProfilePlaylistsComponent},
      {path: 'user/:id/followers', component: ProfileFollowersComponent},
      {path: 'user/:id/followings', component: ProfileFollowingsComponent},
      {path: 'artist/:id', component: ArtistComponent},
      {path: 'artist/:id/tracks', component: ArtistTracksComponent},
      {path: 'artist/:id/albums', component: ArtistAlbumsComponent},
      {path: 'artist/:id/:slug', component: ArtistComponent},
      {path: 'crew/:slug', component: CrewComponent},
      {path: 'track/:id', component: TrackComponent},
      {path: 'track/:id/:slug', component: TrackComponent},
      {path: 'album/:id', component: AlbumComponent},
      {path: 'album/:id/:slug', component: AlbumComponent},
      {path: 'podcast/:id', component: PodcastComponent},
      {path: 'podcast/:id/:slug', component: PodcastComponent},
      {path: 'podcasts', component: PodcastsComponent},
      {path: 'browse', component: BrowseComponent},
      {path: 'browse/:slug', component: PlaylistsComponent},
      {path: 'playlist/:id', component: PlaylistComponent},
      {path: 'playlist/:id/:slug', component: PlaylistComponent},
      {path: 'genre', component: GenresComponent},
      {path: 'charts', component: ChartsComponent},
      {path: 'musics', component: MusicsComponent},
      {path: 'search', component: SearchComponent},
      {path: 'now-playing', component: NowPlayingComponent, canActivate: [AuthGuard]},
      {path: 'recent-plays', component: RecentPlaysComponent, canActivate: [AuthGuard]},
      {path: 'my-playlists', component: MyPlaylistsComponent, canActivate: [AuthGuard]},
      {path: 'my-podcasts', component: MyPodcastsComponent, canActivate: [AuthGuard]},
      {path: 'my-music', component: MyMusicsComponent, canActivate: [AuthGuard]},
      {
        path: 'account',
        canActivate: [AuthGuard],
        children: [
          {path: '', component: AccountComponent},
          {path: 'edit', component: AccountEditComponent},
        ]
      },
      {path: '404', component: NotFoundComponent},
      {path: '**', component: NotFoundComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
