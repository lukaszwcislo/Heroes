import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  map,
  tap,
  Observable,
  OperatorFunction,
  pipe,
  catchError,
  throwError,
  debounceTime,
  interval,
} from 'rxjs';
import { take } from 'rxjs/operators';
import { Hero, HeroesState, HeroDetail } from './hero.types';
import { Pagination } from './../models/pagination/pagination.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';

let _state: HeroesState = {
  heroes: [],
  hero: null,
  pagination: new Pagination({ currentPage: 1, numberOfPages: 0 }),
  getRecordsPending: true,
};

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.getAllHeroes();
  }

  private qp(): Params {
    const qp = {
      name: this.route.snapshot.queryParams['name']
        ? this.route.snapshot.queryParams['name']
        : '',
      page: this.route.snapshot.queryParams['page']
        ? this.route.snapshot.queryParams['page']
        : '1',
    };

    return qp;
  }

  API_URL = 'https://rickandmortyapi.com/api/character';

  private store = new BehaviorSubject<HeroesState>(_state);
  private state$ = this.store.asObservable();

  public heroes$ = this.state$.pipe(map((state) => state.heroes));

  public hero$ = this.state$.pipe(map((state) => state.hero));

  public pagination$ = this.state$.pipe(map((state) => state.pagination));

  public getRecordsPending$ = this.state$.pipe(
    map((state) => state.getRecordsPending)
  );

  public vm$: Observable<HeroesState> = combineLatest(
    this.heroes$,
    this.hero$,
    this.pagination$,
    this.getRecordsPending$
  ).pipe(
    map(([heroes, hero, pagination, getRecordsPending]) => {
      return { heroes, hero, pagination, getRecordsPending };
    })
  );

  private updateState(state: HeroesState) {
    this.store.next((_state = state));
  }

  private getAllHeroesFromAPI(): Observable<any> {
    return this.http.get<Hero[]>(
      `${this.API_URL}?name=${this.qp()['name']}&page=${this.qp()['page']}`
    );
  }

  private pipeHeroModeling() {
    return map((response: any) => {
      const heroes: Hero[] = [];
      let pagination: Pagination;
      response.results.forEach((hero: Hero) => {
        heroes.push(new Hero(hero));
      });
      pagination = new Pagination(response.info);

      return { heroes, pagination };
    });
  }

  public getAllHeroes(): void {
    this.getAllHeroesFromAPI()
      .pipe(this.pipeHeroModeling())
      .subscribe(
        ({ heroes, pagination }) => {
          pagination.currentPage = +this.qp()['page'];
          this.updateState({
            ..._state,
            heroes,
            pagination,
            getRecordsPending: false,
          });
          console.log('_state,', _state);
        },
        (err) => {
          this.updateState({
            ..._state,
            getRecordsPending: false,
          });
        }
      );
  }

  private getFilteringHeroesFromAPI(e: Event): Observable<Hero[]> {
    const inputValue = (e.target as HTMLInputElement).value;
    this.router.navigate(['heroes'], { queryParams: { name: inputValue } });

    return this.http.get<Hero[]>(`${this.API_URL}/?name=${inputValue}&page=1`);
  }

  public getFilteringHeroes(e: Event): void {
    this.updateState({
      ..._state,
      getRecordsPending: true,
      heroes: [],
    });

    setTimeout(
      () => {
        this.getFilteringHeroesFromAPI(e)
          .pipe(this.pipeHeroModeling())
          .subscribe(
            ({ heroes, pagination }) => {
              this.updateState({
                ..._state,
                heroes,
                pagination,
                getRecordsPending: false,
              });
              console.log('_state,', _state);
            },
            (err: Error) => {
              this.updateState({
                ..._state,
                heroes: [],
                getRecordsPending: false,
                pagination: new Pagination({
                  currentPage: 1,
                  numberOfPages: 0,
                }),
              });
            }
          );
      },
      this.drawRandomNumber(100, 400) > 300 ? this.drawRandomNumber(0, 0) : 0
    );
  }

  private getHeroDetailFromAPI(paramID: string): Observable<HeroDetail> {
    return this.http.get<HeroDetail>(`${this.API_URL}/${paramID}`);
  }

  public getHeroDetail(paramID: string): void {
    this.getHeroDetailFromAPI(paramID)
      .pipe(
        map((response: any) => {
          const hero = new HeroDetail(response);

          return hero;
        })
      )
      .subscribe((hero: HeroDetail) => {
        console.log('hero', hero);

        this.updateState({
          ..._state,
          hero,
        });
      });
  }

  private getCurrentPageFromAPI(pageIndex: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}?name=${this.qp()['name']}&page=${pageIndex}`
    );
  }

  public changeCurrentPage(pageIndex: number): void {
    this.updateState({
      ..._state,
      heroes: [],
      getRecordsPending: true,
    });
    setTimeout(
      () => {
        this.getCurrentPageFromAPI(pageIndex)
          .pipe(this.pipeHeroModeling())
          .subscribe(({ heroes, pagination }) => {
            pagination.currentPage = pageIndex;
            this.router.navigate(['heroes'], {
              queryParams: {
                name: this.qp()['name'],
                page: pageIndex,
              },
            });
            this.updateState({
              ..._state,
              heroes,
              pagination,
              getRecordsPending: false,
            });
          });
      },
      this.drawRandomNumber(100, 400) > 300 ? this.drawRandomNumber(0, 0) : 0
    );
  }

  private drawRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnDestroy(): void {
    _state = {
      heroes: [],
      hero: null,
      pagination: new Pagination({ currentPage: 1, numberOfPages: 0 }),
      getRecordsPending: false,
    };
  }
}
