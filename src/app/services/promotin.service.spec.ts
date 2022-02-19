import { TestBed } from '@angular/core/testing';

import { PromotinService } from './promotin.service';

describe('PromotinService', () => {
  let service: PromotinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
