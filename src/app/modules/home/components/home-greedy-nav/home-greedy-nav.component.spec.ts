import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGreedyNavComponent } from './home-greedy-nav.component';

describe('HomeGreedyNavComponent', () => {
  let component: HomeGreedyNavComponent;
  let fixture: ComponentFixture<HomeGreedyNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGreedyNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGreedyNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
