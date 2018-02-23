import { TestBed, inject } from '@angular/core/testing';

import { OrderInfoService } from './order-info.service';

describe('OrderInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderInfoService]
    });
  });

  it('should be created', inject([OrderInfoService], (service: OrderInfoService) => {
    expect(service).toBeTruthy();
  }));
});
