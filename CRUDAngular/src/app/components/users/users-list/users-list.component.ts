import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {User} from 'src/app/models/User';
import {UsersService} from 'src/app/services/users.service';
import {UserEditComponent} from '../user-edit/user-edit.component';
import {ConfirmationDialogComponent} from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {

  private users: User[]
  private emptyUser = new User('', '', '', '', false, false);
  private displayedColumns: string[] = ['login', 'firstname', 'lastname', 'isactive', 'isadmin', 'edit', 'delete'];
  private dataSource: MatTableDataSource<User>;
  private userDeleteConfirmation;
  private isLoading = true;


  constructor(private data: UsersService, public dialog: MatDialog) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.refreshDataSource('');
  }

  refreshDataSource(filter: string) {
    this.isLoading = true;
    this.data.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }

  showUserEditDialog(user: User): void {
    const editDialogRef = this.dialog.open(UserEditComponent, {
      width: 'auto',
      data: {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        isAdmin: user.isAdmin
      }
    });

    editDialogRef.afterClosed().subscribe((result: User) => {
      if (result != null) {
        const newUser = new User(result.login, result.firstName, result.lastName, '', result.isActive, result.isAdmin);
        this.updateUser(newUser);
      }
    });
  }

  deleteUser(user: User) {
    this.userDeleteConfirmation = false;
    this.showConfirmationDialog(user, 'Usuń', 'Czy na pewno chcesz usunąć użytkownika?');
  }

  showConfirmationDialog(user: User, dialogTitle: string, dialogMessage: string): void {
    const editDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: dialogTitle,
        message: dialogMessage
      }
    });

    editDialogRef.afterClosed().subscribe((result) => {
      this.customQuery();
      console.log('User ' + user.login + ' delete');
    });
  }

  updateUser(user: User) {
    this.data.saveUser(user).subscribe((result) => {
      console.log(result);
    });
  }

  customQuery() {
    this.data.customQuery().subscribe((result) => {
      console.log(result);
    });
  }
}
