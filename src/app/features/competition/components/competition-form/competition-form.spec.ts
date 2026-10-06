import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionForm } from './competition-form';

describe('CompetitionForm', () => {
  let component: CompetitionForm;
  let fixture: ComponentFixture<CompetitionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
