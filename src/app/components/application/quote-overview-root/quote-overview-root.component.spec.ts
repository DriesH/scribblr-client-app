import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteOverviewRootComponent } from './quote-overview-root.component';

describe('QuoteOverviewRootComponent', () => {
  let component: QuoteOverviewRootComponent;
  let fixture: ComponentFixture<QuoteOverviewRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteOverviewRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteOverviewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
