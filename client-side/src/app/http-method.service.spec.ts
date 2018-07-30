import { TestBed, inject } from '@angular/core/testing';

import { HttpMethodService } from './http-method.service';

describe('HttpMethodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpMethodService]
    });
  });

  it('should be created', inject([HttpMethodService], (service: HttpMethodService) => {
    expect(service).toBeTruthy();
  }));
});
