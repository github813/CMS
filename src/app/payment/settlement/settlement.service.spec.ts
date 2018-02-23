import { TestBed, inject } from '@angular/core/testing';

import { SettlementService } from './settlement.service';

describe('SettlementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettlementService]
    });
  });

  it('should be created', inject([SettlementService], (service: SettlementService) => {
    expect(service).toBeTruthy();
  }));
});
