import {
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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
  @ViewChild('iconHeartFill') iconHeartFill!: ElementRef;

  constructor(
    private heroService: HeroDetailService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  public hero!: HeroDetail;

  public isHeroPinned$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public goBack() {
    this.location.back();
  }

  public pinHero() {
    this.heroService.pinHero(this.hero);
    this.checkIfHeroPinned();
    setTimeout(() => {
      this.iconHeartFill.nativeElement.classList.add('is-animating');
    }, 100);
  }

  private checkIfHeroPinned() {
    if (localStorage['pinnedHeroes']) {
      const pinnedHeroes = JSON.parse(localStorage['pinnedHeroes']);
      (() => {
        for (let h of pinnedHeroes) {
          if (h.id === this.hero.id) {
            this.isHeroPinned$.next(true);
            return;
          }
        }
        this.isHeroPinned$.next(false);
      })();
    }
  }

  public openModalEditHero() {
    this.heroService.openModalEditHero(this.hero);
  }

  ngOnInit(): void {
    this.hero = this.route.snapshot.data['hero'];
    this.checkIfHeroPinned();
  }

  ngOnChanges() {}
}
