import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HeroDetailService } from './hero-detail.service';

@Injectable({
  providedIn: 'root',
})
export class HeroDetailResolver implements Resolve<boolean> {
  constructor(private heroService: HeroDetailService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const paramID = route.params['id'];
    return this.heroService.getHeroDetail(paramID);
  }
}
