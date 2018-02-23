import { TestBed, inject } from '@angular/core/testing';
import {OrderCompleteService} from "./order-complete.service";

describe('OrderCompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderCompleteService]
    });
  });

  it('should be created', inject([OrderCompleteService], (service: OrderCompleteService) => {
    expect(service).toBeTruthy();
  }));
});
