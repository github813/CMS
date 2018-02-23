import { TestBed, inject } from '@angular/core/testing';
import {OrderSyncService} from "./order-sync.service";

describe('OrderInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderSyncService]
    });
  });

  it('should be created', inject([OrderSyncService], (service: OrderSyncService) => {
    expect(service).toBeTruthy();
  }));
});
