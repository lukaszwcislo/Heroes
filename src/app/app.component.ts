import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { HeroDetailService } from './heroes/hero-detail/hero-detail.service';

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

  public openModal() {
    this.dialogRef.open(PopupComponent, {
      height: '400px',
      width: '600px',
    });
  }

  ngOnInit(): void {
    this.heroService.updateIsModalOpen$
      .pipe()
      .subscribe((isModalOpen: boolean) => {
        isModalOpen && this.openModal();
      });
  }
}
