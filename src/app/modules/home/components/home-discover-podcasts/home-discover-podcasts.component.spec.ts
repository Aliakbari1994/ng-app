import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscoverPodcastsComponent } from './home-discover-podcasts.component';

describe('HomeDiscoverPodcastsComponent', () => {
  let component: HomeDiscoverPodcastsComponent;
  let fixture: ComponentFixture<HomeDiscoverPodcastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscoverPodcastsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscoverPodcastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
