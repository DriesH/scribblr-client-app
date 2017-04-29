import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOverviewRootComponent } from './book-overview-root.component';

describe('BookOverviewRootComponent', () => {
  let component: BookOverviewRootComponent;
  let fixture: ComponentFixture<BookOverviewRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOverviewRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOverviewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
