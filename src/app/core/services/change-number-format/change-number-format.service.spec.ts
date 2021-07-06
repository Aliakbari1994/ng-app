import { TestBed } from '@angular/core/testing';

import { ChangeNumberFormatService } from './change-number-format.service';

describe('ChangeNumberFormatService', () => {
  let service: ChangeNumberFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeNumberFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
