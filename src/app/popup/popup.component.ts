import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroDetail } from '../heroes/hero.types';
import { HeroDetailService } from '../heroes/hero-detail/hero-detail.service';
import { debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  providers: [HeroDetailService]
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
      heroImage : new FormControl(this.data.hero.img)
    })
  }

  public closeModal() {
    this.dialogRef.close();
  }

  public updateHero() {
    this.data.hero.img = this.imgSrc;
    this.heroService.updateHero(this.data.hero);
    this.closeModal();
  }

  private checkIfResourceExists(url: string): void {
    this.heroService.checkIfResourceExists(url)
  }

  public imgSrc?: string;
  public loading: boolean = false;
  public status: number = 200;

  ngOnInit() : void {
    this.imgSrc = this.data.hero.img;
    this.createForm();
    this.heroService.stausUpdate$
      .subscribe(status => {
        this.status = status;
      })
    this.form.valueChanges
      .pipe(
        tap(() =>{
          this.loading = true
        }),
        debounceTime(500), 
        map((resp) => {
        this.checkIfResourceExists(resp.heroImage)
        
        return resp;
      }))
      .subscribe(value => {
        this.imgSrc = value.heroImage;
        this.loading = false
      })
  }
}
