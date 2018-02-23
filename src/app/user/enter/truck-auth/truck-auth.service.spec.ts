import { TestBed, inject } from '@angular/core/testing';

import { TruckAuthService } from './truck-auth.service';

describe('TruckAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TruckAuthService]
    });
  });

  it('should be created', inject([TruckAuthService], (service: TruckAuthService) => {
    expect(service).toBeTruthy();
  }));
});
