import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalScoredForm } from './goal-scored-form';

describe('GoalScoredForm', () => {
  let component: GoalScoredForm;
  let fixture: ComponentFixture<GoalScoredForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalScoredForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GoalScoredForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
