import { TestBed } from '@angular/core/testing';

import { HeroDetailResolver } from './hero-detail.resolver';

describe('HeroDetailResolver', () => {
  let resolver: HeroDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HeroDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
