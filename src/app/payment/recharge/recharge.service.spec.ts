import { TestBed, inject } from '@angular/core/testing';

import { RechargeService } from './recharge.service';

describe('RechargeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RechargeService]
    });
  });

  it('should be created', inject([RechargeService], (service: RechargeService) => {
    expect(service).toBeTruthy();
  }));
});
