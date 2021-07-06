import { TestBed } from '@angular/core/testing';

import { GenerateRecaptchaCodeService } from './generate-recaptcha-code.service';

describe('GenerateRecaptchaCodeService', () => {
  let service: GenerateRecaptchaCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateRecaptchaCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
