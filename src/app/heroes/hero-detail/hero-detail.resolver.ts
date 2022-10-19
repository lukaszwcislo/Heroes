import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of, catchError } from 'rxjs';
import { HeroDetailService } from './hero-detail.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HeroDetailResolver implements Resolve<boolean> {
  constructor(
    private heroService: HeroDetailService,
    private messageService: MessageService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const paramID = route.params['id'];
    return this.heroService.getHeroDetail(paramID).pipe(
      catchError(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Błąd',
          detail: 'Coś poszło nie tak',
        });
        return EMPTY;
      })
    );
  }
}
