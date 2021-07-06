import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscoverCategoriesComponent } from './home-discover-categories.component';

describe('HomeDiscoverCategoriesComponent', () => {
  let component: HomeDiscoverCategoriesComponent;
  let fixture: ComponentFixture<HomeDiscoverCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscoverCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscoverCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
