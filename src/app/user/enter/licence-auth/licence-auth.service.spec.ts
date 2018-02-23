import { TestBed, inject } from '@angular/core/testing';

import { LicenceAuthService } from './licence-auth.service';

describe('LicenceAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicenceAuthService]
    });
  });

  it('should be created', inject([LicenceAuthService], (service: LicenceAuthService) => {
    expect(service).toBeTruthy();
  }));
});
