import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroDetail, HeroesState } from '../hero.types';
import { HeroesService } from '../heroes-facade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroDetailService } from './hero-detail.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private heroService: HeroDetailService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  public hero!: HeroDetail;

  public goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.hero = this.route.snapshot.data['hero'];
    console.log('this.route.snapshot.data', this.route.snapshot.data);
  }
}
