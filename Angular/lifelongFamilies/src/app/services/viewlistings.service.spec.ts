import { TestBed } from '@angular/core/testing';

import { ViewlistingsService } from './viewlistings.service';

describe('ViewlistingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewlistingsService = TestBed.get(ViewlistingsService);
    expect(service).toBeTruthy();
  });
});
