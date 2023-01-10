import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hero, HeroDetail, HeroesState } from './hero.types';
import { HeroesService } from './heroes-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroDetailService } from './hero-detail/hero-detail.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroesService],
})
export class HeroesComponent implements OnInit, OnDestroy {
  constructor(
    private facade: HeroesService,
    private route: ActivatedRoute,
    private router: Router,
    private heroDetailService: HeroDetailService,
    private dialogRef: MatDialog,
  ) {}

  private heroesSubscription = new Subscription()

  public vm$: Observable<HeroesState> = this.facade.vm$;

  private hero!: HeroDetail;

  public searchForHeroesName(inputEvent: Event) {
    this.facade.getFilteringHeroes(inputEvent);
  }

  public changeCurrentPage(pageIndex: number) {
    this.facade.changeCurrentPage(pageIndex);
  }

  public openModalEditHero(isModalOpen: boolean) {
    this.heroDetailService.openModalEditHero(this.hero);
  }

  public getHeroDetail(hero: HeroDetail) {
    this.hero = hero;
  }

  public heroesUpdate: boolean = true;

  ngOnInit(): void {
    this.heroesSubscription.add(this.dialogRef.afterAllClosed.subscribe(() => { 
      if(localStorage["pinnedHeroes"]) {
        const pinnedHeroes = JSON.parse(localStorage["pinnedHeroes"])
        pinnedHeroes.forEach((h: HeroDetail) => {
          if (this.hero && h.id === this.hero.id) {
            this.facade.updateHero(this.hero)
          }
        })
      }
    }))

    this.heroesSubscription.add(this.facade.heroes$
      .subscribe((heroes: HeroDetail[]) => {
        this.heroesUpdate = !this.heroesUpdate;
      }))
  }

  ngOnDestroy(): void {
    this.heroesSubscription.unsubscribe();
  }
}
