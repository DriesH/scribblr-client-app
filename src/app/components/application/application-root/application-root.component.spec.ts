import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRootComponent } from './application-root.component';

describe('ApplicationRootComponent', () => {
  let component: ApplicationRootComponent;
  let fixture: ComponentFixture<ApplicationRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
