import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteComponentComponent } from './quote-component.component';

describe('QuoteComponentComponent', () => {
  let component: QuoteComponentComponent;
  let fixture: ComponentFixture<QuoteComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
