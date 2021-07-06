import { TestBed } from '@angular/core/testing';

import { CheckAuthResolver } from './check-auth.resolver';

describe('CheckAuthResolver', () => {
  let resolver: CheckAuthResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CheckAuthResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
