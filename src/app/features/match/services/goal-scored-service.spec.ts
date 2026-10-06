import { TestBed } from '@angular/core/testing';

import { GoalScoredService } from './goal-scored-service';

describe('GoalScoredService', () => {
  let service: GoalScoredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalScoredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
