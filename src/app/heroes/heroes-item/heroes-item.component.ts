import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeroDetail } from '../hero.types';

@Component({
  selector: 'app-heroes-item',
  templateUrl: './heroes-item.component.html',
  styleUrls: ['./heroes-item.component.scss'],
})
export class HeroesItemComponent implements OnInit {
  @Input() hero!: HeroDetail;
  @Output() emitOpenModalEditHero: EventEmitter<boolean> = new EventEmitter();
  @Output() emitHeroDetail: EventEmitter<HeroDetail> = new EventEmitter();

  constructor() {}

  public openModalEditHero(e: Event) {
    e.stopPropagation();
    this.emitHeroDetail.emit(this.hero);
    this.emitOpenModalEditHero.emit(true);
  }

  ngOnInit(): void {}
}
