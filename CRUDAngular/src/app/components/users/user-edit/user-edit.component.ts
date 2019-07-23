import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from 'src/app/models/User';
import {Validator} from 'src/app/models/Validator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) {}

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  validateUser(user: User): boolean {
    const validator = new Validator();
    return validator.isUserValid(user);
  }
}
