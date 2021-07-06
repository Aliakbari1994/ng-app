import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPodcastsComponent } from './my-podcasts.component';

describe('MyPodcastsComponent', () => {
  let component: MyPodcastsComponent;
  let fixture: ComponentFixture<MyPodcastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPodcastsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPodcastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
