import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HeroDetail } from '../hero.types';

@Component({
  selector: 'app-heroes-item',
  templateUrl: './heroes-item.component.html',
  styleUrls: ['./heroes-item.component.scss'],
})
export class HeroesItemComponent implements OnInit, OnChanges {
  @Input() hero!: HeroDetail;
  @Input() heroUpdate!: boolean;
  @Output() emitOpenModalEditHero: EventEmitter<boolean> = new EventEmitter();
  @Output() emitHeroDetail: EventEmitter<HeroDetail> = new EventEmitter();

  constructor() {}

  public heroImage: string = '';

  public openModalEditHero(e: Event) {
    e.stopPropagation();
    this.emitHeroDetail.emit(this.hero);
    this.emitOpenModalEditHero.emit(true);
  }

  ngOnInit(): void {
    this.heroImage = `url("${this.hero.img ? this.hero.img : ''}")`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.heroImage = `url("${this.hero.img ? this.hero.img : ''}")`;
  }
}
