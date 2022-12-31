import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroDetail } from '../hero.types';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeroDetailService {
  constructor(private http: HttpClient, private message: MessageService, private router: Router) {
  }

  API_URL = 'https://rickandmortyapi.com/api/character';

  public hero!: HeroDetail;

  private getHeroDetailFromAPI(paramID: string): Observable<HeroDetail> {
    return this.http.get<HeroDetail>(`${this.API_URL}/${paramID}`);
  }

  public getHeroDetail(paramID: string) {
    return this.getHeroDetailFromAPI(paramID).pipe(
      map((response: any) => {
        let hero: HeroDetail = new HeroDetail(response);
        if (localStorage['pinnedHeroes']) {
          const pinnedHeroes = JSON.parse(localStorage['pinnedHeroes']);
          pinnedHeroes.forEach((h: HeroDetail) => {
            if (h.id === hero.id) {
              hero.img = h.img;
            }
          });
        }

        return hero;
      })
    );
  }

  public pinHero(hero: HeroDetail) {
    if (!localStorage['pinnedHeroes']) {
      const pinnedHeroes = [];
      pinnedHeroes.push(hero);
      this.message.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'The hero has been pinned',
      });
      localStorage.setItem('pinnedHeroes', JSON.stringify(pinnedHeroes));
    } else {
      let pinnedHeroes: HeroDetail[] = [];
      pinnedHeroes = JSON.parse(localStorage['pinnedHeroes']);

      const checkIfHeroPinned = () => {
        for (let h of pinnedHeroes) {
          const index = pinnedHeroes.indexOf(h);
          if (h.id === hero.id) {
            pinnedHeroes.splice(index, 1);
            this.message.add({
              severity: 'success',
              summary: 'Success!',
              detail: 'The hero has been unfastened',
            });
            return;
          }
        }

        pinnedHeroes.push(hero);
        this.message.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'The hero has been pinned',
        });
      };

      checkIfHeroPinned();
      localStorage['pinnedHeroes'] = JSON.stringify(pinnedHeroes);
    }
  }

  public updateHero(hero: HeroDetail) {
    if (!localStorage['pinnedHeroes']) {
      const pinnedHeroes = [];
      pinnedHeroes.push(hero);
      this.message.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'The hero has been changed',
      });
      localStorage.setItem('pinnedHeroes', JSON.stringify(pinnedHeroes));
    } else {
      let pinnedHeroes: HeroDetail[] = [];
      pinnedHeroes = JSON.parse(localStorage['pinnedHeroes']);

      const checkIfHeroPinned = () => {
        for (let h of pinnedHeroes) {
          const index = pinnedHeroes.indexOf(h);
          if (h.id === hero.id) {
            pinnedHeroes.splice(index, 1, hero);
            this.message.add({
              severity: 'success',
              summary: 'Success!',
              detail: 'The hero has been changed',
            });
            return;
          }
        }

        pinnedHeroes.push(hero);
        this.message.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'The hero has been changed',
        });
      };
      
      checkIfHeroPinned();
      localStorage['pinnedHeroes'] = JSON.stringify(pinnedHeroes);
    }
  }

  private _status$: BehaviorSubject<number> = new BehaviorSubject(200);
  public stausUpdate$: Observable<number> = this._status$.asObservable();

  public checkIfResourceExists(url: string) : void {
    this.http.get(url)
    .subscribe((response: any)=> {}, (err) =>{
      this._status$.next(err.status);
    })
  }

  private _isModalOpen$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateIsModalOpen$ = this._isModalOpen$.asObservable();

  private _hero$: Subject<HeroDetail> = new Subject<HeroDetail>();
  public updateHero$ = this._hero$.asObservable();

  public openModalEditHero(hero?: HeroDetail) {
    this._hero$.next(hero!);
    this._isModalOpen$.next(true);
  }
}
