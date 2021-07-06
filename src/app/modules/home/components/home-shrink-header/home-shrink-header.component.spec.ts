import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShrinkHeaderComponent } from './home-shrink-header.component';

describe('HomeShrinkHeaderComponent', () => {
  let component: HomeShrinkHeaderComponent;
  let fixture: ComponentFixture<HomeShrinkHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeShrinkHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeShrinkHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
