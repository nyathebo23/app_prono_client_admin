import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PenaltyShootoutResultForm } from './penalty-shootout-result-form';

describe('PenaltyShootoutResultForm', () => {
  let component: PenaltyShootoutResultForm;
  let fixture: ComponentFixture<PenaltyShootoutResultForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenaltyShootoutResultForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PenaltyShootoutResultForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
