import { TestBed } from '@angular/core/testing';

import { OrganisationsService } from './organisations.service';

describe('OrganisationsService', () => {
  let service: OrganisationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganisationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
