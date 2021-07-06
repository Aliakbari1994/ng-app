import { TestBed } from '@angular/core/testing';

import { ExplorerHistoryService } from './explorer-history.service';

describe('ExplorerHistoryService', () => {
  let service: ExplorerHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplorerHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
