import { TestBed } from '@angular/core/testing';

import { TimeChangeFormatService } from './time-change-format.service';

describe('TimeChangeFormatService', () => {
  let service: TimeChangeFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeChangeFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
