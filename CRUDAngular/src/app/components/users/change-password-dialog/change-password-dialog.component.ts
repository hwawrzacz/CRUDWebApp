import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface Password {
  password: string;
}

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})

export class ChangePasswordDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Password) {}

  ngOnInit() {
    console.log('Password ' + this.data.password);
  }

  validatePassword(password: string) {
    if (password.trim().length >= 8) {
      return true;
    }
    return false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
