import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HeroDetail } from '../heroes/hero.types';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private messageService: MessageService) {
    this.getPinnedHeroes();
  }

  private _pinnedHeroes$: BehaviorSubject<HeroDetail[]> = new BehaviorSubject<
    HeroDetail[]
  >([]);
  public pinnedHeroes$: Observable<HeroDetail[]> =
    this._pinnedHeroes$.asObservable();

  public getPinnedHeroes() {
    if (window.localStorage['pinnedHeroes']) {
      const pinnedHeroes = JSON.parse(localStorage['pinnedHeroes']);
      this._pinnedHeroes$.next(pinnedHeroes);
    }
  }

  public unpinAllHeroes() {
    localStorage.removeItem('pinnedHeroes');
    if (!localStorage['pinnedHeroes']) {
      this._pinnedHeroes$.next([]);
      this.messageService.add({
        severity: 'success',
        summary: 'Sukces!',
        detail: 'Wszyscy bohaterowie zostali odpięci',
      });
    }
  }
}
