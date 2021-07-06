import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGoBackComponent } from './home-go-back.component';

describe('HomeGoBackComponent', () => {
  let component: HomeGoBackComponent;
  let fixture: ComponentFixture<HomeGoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGoBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
