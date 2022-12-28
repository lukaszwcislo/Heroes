import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroDetail } from '../heroes/hero.types';
import { HeroDetailService } from '../heroes/hero-detail/hero-detail.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { hero: HeroDetail },
    private heroService: HeroDetailService
    ) {}

  public form!: FormGroup;

  private createForm() {
    this.form = new FormGroup({
      heroImage : new FormControl('')
    })
  }

  public closeModal() {
    this.dialogRef.close();
  }

  public updateHero() {
    this.heroService.updateHero(this.data.hero)
  }

  ngOnInit() : void {
    this.createForm();
    this.form.valueChanges
      .subscribe(value => {
        console.log(value);
        console.log(this.data);
        
      })
  }
}
