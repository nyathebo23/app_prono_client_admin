import { TestBed } from '@angular/core/testing';
import { GoalScoredStore } from './goal-scored-store';

describe('GoalScoredStore', () => {
  let service: GoalScoredStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalScoredStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
