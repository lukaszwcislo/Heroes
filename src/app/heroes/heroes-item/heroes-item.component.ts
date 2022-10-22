import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero.types';

@Component({
  selector: 'app-heroes-item',
  templateUrl: './heroes-item.component.html',
  styleUrls: ['./heroes-item.component.scss'],
})
export class HeroesItemComponent implements OnInit {
  @Input() hero!: Hero;
  @Output() emitOpenModalEditHero: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  public openModalEditHero(e: Event) {
    e.stopPropagation();
    this.emitOpenModalEditHero.emit(true);
  }

  ngOnInit(): void {}
}
