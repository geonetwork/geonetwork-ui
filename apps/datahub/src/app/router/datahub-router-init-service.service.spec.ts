import { TestBed } from '@angular/core/testing';

import { DatahubRouterInitServiceService } from './datahub-router-init-service.service';

describe('DatahubRouterInitServiceService', () => {
  let service: DatahubRouterInitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatahubRouterInitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
