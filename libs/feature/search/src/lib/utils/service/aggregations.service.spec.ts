import { TestBed } from '@angular/core/testing';

import { AggregationsService } from './aggregations.service';

describe('AggregationsService', () => {
  let service: AggregationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
