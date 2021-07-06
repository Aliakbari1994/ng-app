import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMusicsComponent } from './my-musics.component';

describe('MyMusicsComponent', () => {
  let component: MyMusicsComponent;
  let fixture: ComponentFixture<MyMusicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMusicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMusicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
