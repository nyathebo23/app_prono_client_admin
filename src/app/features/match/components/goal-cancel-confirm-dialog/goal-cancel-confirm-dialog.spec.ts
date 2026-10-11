import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalCancelConfirmDialog } from './goal-cancel-confirm-dialog';

describe('GoalCancelConfirmDialog', () => {
  let component: GoalCancelConfirmDialog;
  let fixture: ComponentFixture<GoalCancelConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalCancelConfirmDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GoalCancelConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
