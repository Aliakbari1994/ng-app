import { TestBed } from '@angular/core/testing';

import { ScoreRateService } from './score-rate.service';

describe('ScoreRateService', () => {
  let service: ScoreRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
