import { TestBed } from '@angular/core/testing';
import { CompetitionQueryStore } from './competition-query-store';

describe('CompetitionQueryStore', () => {
  let service: CompetitionQueryStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionQueryStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
