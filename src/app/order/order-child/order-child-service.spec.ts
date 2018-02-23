import { TestBed, inject } from '@angular/core/testing';

import { OrderChildService } from './order-child-service';

describe('OrderChildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderChildService]
    });
  });

  it('should be created', inject([OrderChildService], (service: OrderChildService) => {
    expect(service).toBeTruthy();
  }));
});
