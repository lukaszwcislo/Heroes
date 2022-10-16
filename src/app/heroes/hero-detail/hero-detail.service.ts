import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroDetail } from '../hero.types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroDetailService {
  constructor(private http: HttpClient) {}

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
}
