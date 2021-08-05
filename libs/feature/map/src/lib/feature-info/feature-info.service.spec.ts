import { TestBed } from '@angular/core/testing';

import { FeatureInfoService } from './feature-info.service';

describe('FeatureInfoService', () => {
  let service: FeatureInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
