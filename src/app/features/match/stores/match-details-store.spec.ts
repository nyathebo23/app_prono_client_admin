import { TestBed } from '@angular/core/testing';
import { MatchDetailsStore } from './match-details-store';

describe('MatchDetailsStore', () => {
  let service: MatchDetailsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchDetailsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
