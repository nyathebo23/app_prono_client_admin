import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCreateForm } from './match-create-form';

describe('MatchCreateForm', () => {
  let component: MatchCreateForm;
  let fixture: ComponentFixture<MatchCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchCreateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchCreateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
