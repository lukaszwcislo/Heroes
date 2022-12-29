import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { HeroDetailService } from './heroes/hero-detail/hero-detail.service';
import { HeroDetail } from './heroes/hero.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private dialogRef: MatDialog,
    private heroService: HeroDetailService
  ) {}

  public hero!: HeroDetail;

  public openModal() {
    this.dialogRef.open(PopupComponent, {
      minHeight: '400px',
      minWidth: '600px',
      data : {
        hero: this.hero,
      }
    });
  }

  ngOnInit(): void {
    this.heroService.updateIsModalOpen$
      .pipe()
      .subscribe((isModalOpen: boolean) => {
        isModalOpen && this.openModal();
      });
    this.heroService.updateHero$
      .pipe()
      .subscribe((hero: HeroDetail) => {
        this.hero = hero;
      })
  }
}
