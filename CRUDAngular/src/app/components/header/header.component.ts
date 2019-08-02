import {Component, Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

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

  @Output()  logoutButtonClicked = new EventEmitter<boolean>();
  @Output()  scrollAction = new EventEmitter<string>();

  isActive = true;

  ngOnInit() {
  }

  callLogoutButtonClicked() {
    this.logoutButtonClicked.emit(true);
  }

  getWindowScroll(): number {
    return window.pageYOffset;
  }

  callScrollAction(elementId: string) {
    this.scrollAction.emit(elementId);
  }
}

