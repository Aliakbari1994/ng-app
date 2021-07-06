import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscoverPlaylistsComponent } from './home-discover-playlists.component';

describe('HomeDiscoverPlaylistsComponent', () => {
  let component: HomeDiscoverPlaylistsComponent;
  let fixture: ComponentFixture<HomeDiscoverPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscoverPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscoverPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
