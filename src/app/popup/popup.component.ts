import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>) {}

  public form!: FormGroup;

  private createForm() {
    this.form = new FormGroup({
      heroImage : new FormControl('')
    })
  }

  public closeModal() {
    this.dialogRef.close();
  }

  ngOnInit() : void {
    this.createForm();
    this.form.valueChanges
      .subscribe(value => {
        console.log(value);
      })
  }
}
