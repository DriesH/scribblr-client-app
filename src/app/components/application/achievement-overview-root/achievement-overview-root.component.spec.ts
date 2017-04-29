import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievmentOverviewRootComponent } from './achievment-overview-root.component';

describe('AchievmentOverviewRootComponent', () => {
  let component: AchievmentOverviewRootComponent;
  let fixture: ComponentFixture<AchievmentOverviewRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievmentOverviewRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievmentOverviewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
