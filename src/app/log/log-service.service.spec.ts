import { TestBed, inject } from '@angular/core/testing';

import { LogServiceService } from './log-service.service';

describe('LogServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogServiceService]
    });
  });

  it('should be created', inject([LogServiceService], (service: LogServiceService) => {
    expect(service).toBeTruthy();
  }));
});
