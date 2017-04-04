import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarProfileComponent } from './nav-bar-profile.component';

describe('NavBarProfileComponent', () => {
  let component: NavBarProfileComponent;
  let fixture: ComponentFixture<NavBarProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
