import { TestBed } from '@angular/core/testing';
import { TeamQueryStore } from './team-query-store';

describe('TeamQueryStore', () => {
  let service: TeamQueryStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamQueryStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
