import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscoverGenresComponent } from './home-discover-genres.component';

describe('HomeDiscoverGenresComponent', () => {
  let component: HomeDiscoverGenresComponent;
  let fixture: ComponentFixture<HomeDiscoverGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscoverGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscoverGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
