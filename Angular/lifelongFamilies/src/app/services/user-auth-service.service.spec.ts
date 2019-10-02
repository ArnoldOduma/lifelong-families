import { TestBed } from '@angular/core/testing';

import { UserAuthServiceService } from './user-auth-service.service';

describe('UserAuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAuthServiceService = TestBed.get(UserAuthServiceService);
    expect(service).toBeTruthy();
  });
});
