import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationComponent } from './verification.component';

describe('AccueilComponent', () => {
  let component:VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
