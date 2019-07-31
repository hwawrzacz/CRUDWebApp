import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../models/User';
import {UserBasic} from '../../models/UserBasic';
import {Validator} from '../../models/Validator';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {

  private user: UserBasic = new UserBasic();

  @Output() StartLoginProcedure: EventEmitter<UserBasic> = new EventEmitter<UserBasic>();

  constructor() { }

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

}
