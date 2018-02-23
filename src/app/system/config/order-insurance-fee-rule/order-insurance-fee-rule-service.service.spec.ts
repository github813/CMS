import { TestBed, inject } from '@angular/core/testing';

import { OrderInsuranceFeeRuleServiceService } from './order-insurance-fee-rule-service.service';

describe('OrderInsuranceFeeRuleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderInsuranceFeeRuleServiceService]
    });
  });

  it('should be created', inject([OrderInsuranceFeeRuleServiceService], (service: OrderInsuranceFeeRuleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
