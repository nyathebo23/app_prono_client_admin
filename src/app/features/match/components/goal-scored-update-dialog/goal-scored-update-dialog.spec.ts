import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalScoredUpdateDialog } from './goal-scored-update-dialog';

describe('GoalScoredUpdateDialog', () => {
  let component: GoalScoredUpdateDialog;
  let fixture: ComponentFixture<GoalScoredUpdateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalScoredUpdateDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GoalScoredUpdateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
