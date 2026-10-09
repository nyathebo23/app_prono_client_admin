import { TestBed } from '@angular/core/testing';
import { MatchQueryStore } from './match-query-store';

describe('MatchQueryStore', () => {
  let service: MatchQueryStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchQueryStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
