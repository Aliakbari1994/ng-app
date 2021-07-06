import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRelatedCarouselComponent } from './home-related-carousel.component';

describe('HomeRelatedCarouselComponent', () => {
  let component: HomeRelatedCarouselComponent;
  let fixture: ComponentFixture<HomeRelatedCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRelatedCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRelatedCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
