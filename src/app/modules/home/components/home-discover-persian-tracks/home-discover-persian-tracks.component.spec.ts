import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscoverPersianTracksComponent } from './home-discover-persian-tracks.component';

describe('HomeDiscoverPersianTracksComponent', () => {
  let component: HomeDiscoverPersianTracksComponent;
  let fixture: ComponentFixture<HomeDiscoverPersianTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscoverPersianTracksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscoverPersianTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
