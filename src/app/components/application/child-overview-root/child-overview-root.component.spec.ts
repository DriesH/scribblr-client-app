import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildOverviewRootComponent } from './child-overview-root.component';

describe('ChildOverviewRootComponent', () => {
  let component: ChildOverviewRootComponent;
  let fixture: ComponentFixture<ChildOverviewRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildOverviewRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildOverviewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
