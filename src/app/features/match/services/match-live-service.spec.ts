import { TestBed } from '@angular/core/testing';
import { MatchLiveService } from './match-live-service';

describe('MatchLiveService', () => {
  let service: MatchLiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchLiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
