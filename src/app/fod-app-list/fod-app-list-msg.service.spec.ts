import { TestBed, inject } from '@angular/core/testing';

import { FodAppListMsgService } from './fod-app-list-msg.service';

describe('FodAppListMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FodAppListMsgService]
    });
  });

  it('should be created', inject([FodAppListMsgService], (service: FodAppListMsgService) => {
    expect(service).toBeTruthy();
  }));
});
