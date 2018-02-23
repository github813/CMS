import { TestBed, inject } from '@angular/core/testing';

import { BankCardService } from './bank-card.service';

describe('BankCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankCardService]
    });
  });

  it('should be created', inject([BankCardService], (service: BankCardService) => {
    expect(service).toBeTruthy();
  }));
});
