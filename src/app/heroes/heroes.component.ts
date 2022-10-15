import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hero, HeroesState } from './hero.types';
import { HeroesService } from './heroes-facade.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroesService],
})
export class HeroesComponent implements OnInit {
  constructor(private heroesService: HeroesService) {}

  public vm$: Observable<HeroesState> = this.heroesService.vm$;

  public searchForHeroesName(inputEvent: Event) {
    this.heroesService.getFilteringHeroes(inputEvent);
  }

  public changeCurrentPage(pageIndex: number) {
    this.heroesService.changeCurrentPage(pageIndex);
  }

  ngOnInit(): void {}
}
