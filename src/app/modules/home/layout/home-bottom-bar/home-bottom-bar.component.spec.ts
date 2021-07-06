import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBottomBarComponent } from './home-bottom-bar.component';

describe('HomeBottomBarComponent', () => {
  let component: HomeBottomBarComponent;
  let fixture: ComponentFixture<HomeBottomBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBottomBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
