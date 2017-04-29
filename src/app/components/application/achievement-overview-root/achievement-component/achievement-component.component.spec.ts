import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementComponentComponent } from './achievement-component.component';

describe('AchievementComponentComponent', () => {
  let component: AchievementComponentComponent;
  let fixture: ComponentFixture<AchievementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
