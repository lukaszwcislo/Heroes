import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hero, HeroesState } from './hero.types';
import { HeroesService } from './heroes-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroDetailService } from './hero-detail/hero-detail.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroesService],
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router,
    private heroDetailService: HeroDetailService
  ) {}

  public vm$: Observable<HeroesState> = this.heroesService.vm$;

  public searchForHeroesName(inputEvent: Event) {
    this.heroesService.getFilteringHeroes(inputEvent);
  }

  public changeCurrentPage(pageIndex: number) {
    this.heroesService.changeCurrentPage(pageIndex);
  }

  public openModalEditHero(isModalOpen: boolean) {
    this.heroDetailService.openModalEditHero();
  }

  ngOnInit(): void {}
}
