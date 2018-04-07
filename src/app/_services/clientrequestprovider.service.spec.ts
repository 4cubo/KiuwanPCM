import { ClientRequestProviderService } from './clientrequestprovider.service2';
import { TestBed, inject } from '@angular/core/testing';


describe('ClientRequestProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientRequestProviderService]
    });
  });

  it('should be created', inject([ClientRequestProviderService], (service: ClientRequestProviderService) => {
    expect(service).toBeTruthy();
  }));
});
