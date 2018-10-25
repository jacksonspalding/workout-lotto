import { TestBed, inject } from '@angular/core/testing';

import { ActivityUpdateResolverService } from './activity-update-resolver.service';

describe('ActivityUpdateResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityUpdateResolverService]
    });
  });

  it('should be created', inject([ActivityUpdateResolverService], (service: ActivityUpdateResolverService) => {
    expect(service).toBeTruthy();
  }));
});
