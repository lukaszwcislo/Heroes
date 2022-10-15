import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroDetail, HeroesState } from '../hero.types';
import { HeroesService } from '../heroes-facade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  providers: [HeroesService],
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private heroService: HeroesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  public vm$: Observable<HeroesState> = this.heroService.vm$;

  public getParamID() {
    const paramID = this.route.snapshot.params['id'];
    this.heroService.getHeroDetail(paramID);
  }

  public goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.getParamID();
  }
}
