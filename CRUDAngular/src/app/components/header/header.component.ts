import {Component, Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor() { }

  @Input() isLogged: boolean;
  @Input() userLogin: boolean;
  @Input() isAdmin: boolean;

  @Output()  addNewRecipeButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()  addNewProductButtonClicked = new EventEmitter<boolean>();
  @Output()  advancedSearchButtonClicked = new EventEmitter<boolean>();
  @Output()  logoutButtonClicked = new EventEmitter<boolean>();

  isActive = true;

  ngOnInit() {
  }

  callAddNewRecipeButtonClicked() {
    this.addNewRecipeButtonClicked.emit(true);
  }

  callAddNewProductButtonClicked() {
    this.addNewProductButtonClicked.emit(true);
  }

  callAdvancedSearchButtonClicked() {
    this.advancedSearchButtonClicked.emit(true);
  }

  callLogoutButtonClicked() {
    this.logoutButtonClicked.emit(true);
  }
}

