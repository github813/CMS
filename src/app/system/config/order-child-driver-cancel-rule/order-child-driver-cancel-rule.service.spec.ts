import { TestBed, inject } from '@angular/core/testing';

import { OrderChildDriverCancelRuleService } from './order-child-driver-cancel-rule.service';

describe('OrderChildDriverCancelRuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderChildDriverCancelRuleService]
    });
  });

  it('should be created', inject([OrderChildDriverCancelRuleService], (service: OrderChildDriverCancelRuleService) => {
    expect(service).toBeTruthy();
  }));
});
