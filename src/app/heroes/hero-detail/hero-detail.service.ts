import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroDetail } from '../hero.types';
import { map, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HeroDetailService {
  constructor(private http: HttpClient, private message: MessageService) {}

  API_URL = 'https://rickandmortyapi.com/api/character';

  public hero!: HeroDetail;

  private getHeroDetailFromAPI(paramID: string): Observable<HeroDetail> {
    return this.http.get<HeroDetail>(`${this.API_URL}/${paramID}`);
  }

  public getHeroDetail(paramID: string) {
    return this.getHeroDetailFromAPI(paramID).pipe(
      map((response: any) => {
        const hero = new HeroDetail(response);

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
        summary: 'Sukces!',
        detail: 'Bohater został przypiety',
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
              summary: 'Sukces!',
              detail: 'Bohater został odpięty',
            });
            return;
          }
        }

        pinnedHeroes.push(hero);
        this.message.add({
          severity: 'success',
          summary: 'Sukces!',
          detail: 'Bohater został przypiety',
        });
      };

      checkIfHeroPinned();

      localStorage['pinnedHeroes'] = JSON.stringify(pinnedHeroes);
    }
  }
}
