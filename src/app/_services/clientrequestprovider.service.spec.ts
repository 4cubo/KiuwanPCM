import { TestBed, inject } from '@angular/core/testing';
import { ClientRequestProviderService } from './clientrequestprovider.service';


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
