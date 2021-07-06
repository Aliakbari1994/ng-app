import { TestBed } from '@angular/core/testing';

import { CheckPlatformService } from './check-platform.service';

describe('CheckPlatformService', () => {
  let service: CheckPlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckPlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
