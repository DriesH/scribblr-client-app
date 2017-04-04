import { TestBed, inject } from '@angular/core/testing';

import { JWTTokenService } from './jwttoken.service';

describe('JWTTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JWTTokenService]
    });
  });

  it('should ...', inject([JWTTokenService], (service: JWTTokenService) => {
    expect(service).toBeTruthy();
  }));
});
