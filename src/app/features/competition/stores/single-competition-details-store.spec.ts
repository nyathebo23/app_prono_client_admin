import { TestBed } from '@angular/core/testing';
import { SingleCompetitionDetailsStore } from './single-competition-details-store';

describe('SingleCompetitionDetailsStore', () => {
  let service: SingleCompetitionDetailsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleCompetitionDetailsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
