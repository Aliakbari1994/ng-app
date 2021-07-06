import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPlaysComponent } from './recent-plays.component';

describe('RecentPlaysComponent', () => {
  let component: RecentPlaysComponent;
  let fixture: ComponentFixture<RecentPlaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPlaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPlaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
