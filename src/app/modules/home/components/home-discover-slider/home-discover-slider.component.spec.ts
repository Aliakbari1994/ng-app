import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscoverSliderComponent } from './home-discover-slider.component';

describe('HomeDiscoverSliderComponent', () => {
  let component: HomeDiscoverSliderComponent;
  let fixture: ComponentFixture<HomeDiscoverSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscoverSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscoverSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
