import { TestBed } from '@angular/core/testing';

import { DarkThemeService } from './darktheme.service';

describe('DarkthemeService', () => {
  let service: DarkThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
