import { TestBed } from '@angular/core/testing';
import { CompetitionStore } from './competition-store';

describe('CompetitionStore', () => {
  let service: CompetitionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
