import { TestBed } from '@angular/core/testing';
import { MatchDetailsLiveService } from './match-details-live-service';

describe('MatchDetailsLiveService', () => {
  let service: MatchDetailsLiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchDetailsLiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
