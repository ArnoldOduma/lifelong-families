import { TestBed } from '@angular/core/testing';

import { BusinessapiService } from './businessapi.service';

describe('BusinessapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessapiService = TestBed.get(BusinessapiService);
    expect(service).toBeTruthy();
  });
});
