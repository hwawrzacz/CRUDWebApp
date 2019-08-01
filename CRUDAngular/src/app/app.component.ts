import {AfterViewInit, Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RecipesListComponent} from './components/recipes/recipes-list/recipes-list.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';
import {User} from './models/User';
import {Router} from '@angular/router';

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

  @ViewChildren(RecipesListComponent) recipesList !: QueryList<RecipesListComponent>;
  @ViewChildren(ProductsListComponent) productsList !: QueryList<ProductsListComponent>;

  constructor(public router: Router) {
  }

  ngAfterViewInit() {
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

}
