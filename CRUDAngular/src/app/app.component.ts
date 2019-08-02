import {AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RecipesListComponent} from './components/recipes/recipes-list/recipes-list.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';
import {User} from './models/User';
import {Router} from '@angular/router';
import {UserBasic} from './models/UserBasic';
import {MatSnackBar} from '@angular/material';
import {UsersService} from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {

  private title = 'Recipe Manager';
  // hasAdminAccess = true;
  // isLogged = true;
  hasAdminAccess = false;
  isLogged = false;
  loggedUser: User;
  userLogin: string;

  // Child references
  @ViewChild('recipes', {static: true}) recipesRef: HTMLElement;
  @ViewChild('products', {static: true}) productsRef: ElementRef;
  @ViewChild('users', {static: true}) usersRef: ElementRef;

  // @ViewChildren(RecipesListComponent) recipesList !: QueryList<RecipesListComponent>;
  // @ViewChildren(ProductsListComponent) productsList !: QueryList<ProductsListComponent>;

  constructor(private snackBar: MatSnackBar,
              private service: UsersService,
              public router: Router) {
  }

  ngAfterViewInit() {
    // console.log(this.recipesRef.nativeElement.innerHTML);
  }

  logout(): void {
    window.location.replace('/');
  }

  scrollTo($event): void {
    const element = document.getElementById($event);
    const elementPosition = element.offsetTop;
    console.log('scroll: ' + elementPosition);
    // window.scrollTo(0, elementPosition);
    element.scrollIntoView({behavior: 'smooth'});
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

  // endregion

  tryToLogUserIn(user: UserBasic) {
    this.service.getUserByLoginAndPassword(user).subscribe((response) => {
      if (response) {
        this.isLogged = response.isActive;
        this.hasAdminAccess = response.isAdmin;
        this.userLogin = response.login;

        if (!this.isLogged) {
          this.openSnackBar('Użytkownik jest nieaktywny. Skontaktuj się z administratorem.', 'Ok');
        }
      } else {
        this.openSnackBar('Nieprawidłowe dane logowania', 'Ok');
      }
    });
  }
}
