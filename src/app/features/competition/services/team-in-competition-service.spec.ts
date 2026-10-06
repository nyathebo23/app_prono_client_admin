import { TestBed } from '@angular/core/testing';

import { TeamInCompetitionService } from './team-in-competition-service';

describe('TeamInCompetitionService', () => {
  let service: TeamInCompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamInCompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
