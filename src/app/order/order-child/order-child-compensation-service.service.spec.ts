import { TestBed, inject } from '@angular/core/testing';

import { OrderChildCompensationServiceService } from './order-child-compensation-service.service';

describe('OrderChildCompensationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderChildCompensationServiceService]
    });
  });

  it('should be created', inject([OrderChildCompensationServiceService], (service: OrderChildCompensationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
