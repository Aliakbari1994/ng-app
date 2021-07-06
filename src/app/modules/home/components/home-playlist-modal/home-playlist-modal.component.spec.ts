import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlaylistModalComponent } from './home-playlist-modal.component';

describe('HomePlaylistModalComponent', () => {
  let component: HomePlaylistModalComponent;
  let fixture: ComponentFixture<HomePlaylistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePlaylistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePlaylistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
