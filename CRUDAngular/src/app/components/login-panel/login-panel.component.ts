import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../models/User';
import {UserBasic} from '../../models/UserBasic';
import {Validator} from '../../models/Validator';
import {MatSnackBar} from '@angular/material';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {

  private user: UserBasic = new UserBasic();
  hasAdminAccess = false;
  isLogged = false;
  loggedUser: User;
  userLogin: string;

  @Output() StartLoginProcedure: EventEmitter<UserBasic> = new EventEmitter<UserBasic>();

  constructor(private snackBar: MatSnackBar,
              private service: UsersService,
              public router: Router) { }

  ngOnInit() {
  }

  emitLoginEvent() {
    if (this.isUserValid(this.user)) {
      this.StartLoginProcedure.emit(this.user);
    }
  }

  private isUserValid(user: UserBasic): boolean {
    const validator = new Validator();
    return validator.isUserForLoginValid(this.user);
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }
  // endregion

  tryToLogUserIn(user: UserBasic) {
    this.service.getUserByLoginAndPassword(user).subscribe( (response) => {
      if (response) {
        this.isLogged = response.isActive;
        this.hasAdminAccess = response.isAdmin;
        this.userLogin = response.login;

        this.router.navigate(['/recipes', this.hasAdminAccess && this.isLogged]);

        if (!this.isLogged) {
          this.openSnackBar('Użytkownik jest nieaktywny. Skontaktuj się z administratorem.', 'Ok');
        }
      } else {
        this.openSnackBar('Nieprawidłowe dane logowania', 'Ok');
      }
    });
  }
}
