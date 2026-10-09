import { TestBed } from '@angular/core/testing';
import { MatchCommandStore } from './match-command-store';

describe('MatchCommandStore', () => {
  let service: MatchCommandStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchCommandStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
