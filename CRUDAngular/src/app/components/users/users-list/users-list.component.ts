import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  private displayedColumns: string[] = ['login', 'firstName', 'lastName', 'isActive', 'isAdmin', 'edit', 'delete'];
  private dataSource: MatTableDataSource<User>;
  private isLoading = true;

  constructor(private service: UsersService, public dialog: MatDialog) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.refreshDataSource('');
  }

  refreshDataSource(filter: string) {
    this.isLoading = true;
    this.service.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }

  // region Functions | Dialogs openers
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
        if (user.login === '') { // if new user is being created (empty user were passed to edit component)
          this.createUser(newUser);
        } else {
          this.updateUser(user.login, newUser);
        }
      }
    });
  }

  showUserDeleteConfirmationDialog(user: User): void {
    const editDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Usuń',
        message: 'Czy na pewno chcesz usunąć użytkownika?'
      }
    });

    editDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }
  // endregion


  // region Service communication
  createUser(user: User) {
    this.service.createUser(user).subscribe((response) => {
      console.log(response);
    });
  }

  updateUser(login: string, user: User) {
    this.service.updateUser(login, user).subscribe((response) => {
      console.log(response);
    });
  }

  deleteUser(user: User) {
    this.service.deleteUser(user).subscribe( (response) => {
      console.log(response);
    });
  }

  // endregion
}
