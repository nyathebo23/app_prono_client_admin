import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalScoredViewItem } from './goal-scored-view-item';

describe('GoalScoredViewItem', () => {
  let component: GoalScoredViewItem;
  let fixture: ComponentFixture<GoalScoredViewItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalScoredViewItem]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GoalScoredViewItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
