import { TestBed, inject } from '@angular/core/testing';

import { OrderChildOwnerCancelRuleService } from './order-child-owner-cancel-rule.service';

describe('OrderChildOwnerCancelRuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderChildOwnerCancelRuleService]
    });
  });

  it('should be created', inject([OrderChildOwnerCancelRuleService], (service: OrderChildOwnerCancelRuleService) => {
    expect(service).toBeTruthy();
  }));
});
