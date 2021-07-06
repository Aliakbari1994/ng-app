import {AfterViewInit, Component, NgZone, OnDestroy} from '@angular/core';
import {takeWhile} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

import {AddToPlaylistService} from "../../../../core/services/add-to-playlist/add-to-playlist.service";
import {HomeFacade} from "../../store/home.facade";
import * as $ from "jquery";

@Component({
  selector: 'app-home-playlist-modal',
  templateUrl: './home-playlist-modal.component.html',
  styleUrls: ['./home-playlist-modal.component.scss']
})
export class HomePlaylistModalComponent implements AfterViewInit, OnDestroy {
  componentActive = true;

  constructor(
    private addToPlaylistService: AddToPlaylistService,
    private homeFacade: HomeFacade,
    private zone: NgZone,
    private route: ActivatedRoute,
  ) {
  }

  ngAfterViewInit(): void {
    this.addToPlaylistService.init();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public addToPlaylist(): void {
    const playlistId = $('.select2-playlist').val();
    this.zone.runOutsideAngular(() => {
      this.homeFacade.addToPlaylistTrackSlug$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        if (res) {
          this.homeFacade.dispatchAddTrackToPlaylist(res as string, playlistId as string);
        }
      })
      this.homeFacade.addToPlaylistAlbumSlug$.pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        if (res) {
          this.homeFacade.dispatchAddAlbumToPlaylist(res as string, playlistId as string);
        }
      })
    });
  }
}
