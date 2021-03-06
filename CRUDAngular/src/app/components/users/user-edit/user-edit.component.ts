import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {User} from 'src/app/models/User';
import {Validator} from 'src/app/models/Validator';
import {ChangePasswordDialogComponent} from "../change-password-dialog/change-password-dialog.component";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) {}

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  changeIsActiveValue($event) {
    this.user.isActive = $event.checked;
  }

  changeIsAdminValue($event) {
    this.user.isAdmin = $event.checked;
  }

  validateUser(user: User): boolean {
    const validator = new Validator();
    return validator.isUserValid(user);
  }

  openChangePasswordDialog() {
    const changePasswordDialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: 'auto',
      data: { password: ''}
    });

    changePasswordDialogRef.afterClosed().subscribe( (result) => {
      if (result != null) {
        this.setUserPassword(result.password);
      }
    });
  }

  setUserPassword(password: string) {
    this.user.password = password;
  }
}
