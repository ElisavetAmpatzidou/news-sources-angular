import { TestBed } from '@angular/core/testing';

import { NewsApiServiceService } from './news-api.service';

describe('NewsApiServiceService', () => {
  let service: NewsApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
