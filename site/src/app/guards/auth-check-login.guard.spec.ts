import { TestBed } from '@angular/core/testing';

import { AuthCheckLoginGuard } from './auth-check-login.guard';

describe('AuthCheckLoginGuard', () => {
  let guard: AuthCheckLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCheckLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
