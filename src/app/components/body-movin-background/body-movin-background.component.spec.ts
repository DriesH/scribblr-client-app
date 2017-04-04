import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMovinBackgroundComponent } from './body-movin-background.component';

describe('BodyMovinBackgroundComponent', () => {
  let component: BodyMovinBackgroundComponent;
  let fixture: ComponentFixture<BodyMovinBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyMovinBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMovinBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
