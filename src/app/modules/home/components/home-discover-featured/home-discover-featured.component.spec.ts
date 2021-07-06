import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscoverFeaturedComponent } from './home-discover-featured.component';

describe('HomeDiscoverFeaturedComponent', () => {
  let component: HomeDiscoverFeaturedComponent;
  let fixture: ComponentFixture<HomeDiscoverFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscoverFeaturedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscoverFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
