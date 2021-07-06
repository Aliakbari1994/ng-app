import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDiscoverPersianAlbumsComponent } from './home-discover-persian-albums.component';

describe('HomeDiscoverPersianAlbumsComponent', () => {
  let component: HomeDiscoverPersianAlbumsComponent;
  let fixture: ComponentFixture<HomeDiscoverPersianAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDiscoverPersianAlbumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDiscoverPersianAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
