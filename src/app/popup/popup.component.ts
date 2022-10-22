import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>) {}

  ngOnInit(): void {}

  public closeModal() {
    this.dialogRef.close();
  }
}
