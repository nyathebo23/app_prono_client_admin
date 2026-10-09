import { TestBed } from '@angular/core/testing';
import { TeamInCompetitionStore } from './team-in-competition-store';

describe('TeamInCompetitionStore', () => {
  let service: TeamInCompetitionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamInCompetitionStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
