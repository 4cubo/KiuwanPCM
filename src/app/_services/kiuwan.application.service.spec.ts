import { TestBed, inject } from '@angular/core/testing';

import { KiuwanApplicationService } from './kiuwan.application.service';

describe('KiuwanApplicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KiuwanApplicationService]
    });
  });

  it('should be created', inject([KiuwanApplicationService], (service: KiuwanApplicationService) => {
    expect(service).toBeTruthy();
  }));
});
