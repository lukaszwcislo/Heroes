import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero.types';

@Component({
  selector: 'app-heroes-item',
  templateUrl: './heroes-item.component.html',
  styleUrls: ['./heroes-item.component.scss'],
})
export class HeroesItemComponent implements OnInit {
  @Input() hero!: Hero;

  constructor() {}

  ngOnInit(): void {}
}
