import {AfterViewInit, Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RecipesListComponent} from './components/recipes/recipes-list/recipes-list.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';
import {User} from './models/User';
import {UserBasic} from './models/UserBasic';
import {UsersService} from './services/users.service';
import {MatSnackBar, MatDialogModule, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit{
  private title = 'Recipe Manager';
  hasAdminAccess = false;
  isLogged = false;
  loggedUser: User;

  @ViewChildren(RecipesListComponent) recipesList !: QueryList<RecipesListComponent>;
  @ViewChildren(ProductsListComponent) productsList !: QueryList<ProductsListComponent>;

  constructor(private service: UsersService,
              private _snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
  }


  // @ViewChild(RecipesListComponent, {static: true}) recipesList: RecipesListComponent;
  // @ViewChild(ProductsListComponent, {static: true}) productList: ProductsListComponent;

  // region Header buttons event handlers
  openNewRecipeDialog(value: boolean) {
    this.recipesList.first.showRecipeEditDialog(this.recipesList.first.emptyRecipe);
  }

  openNewProductDialog(value: boolean) {
    this.productsList.first.showProductEditDialog(this.productsList.first.emptyProduct);
  }

  openAdvancedSearchDialog(value: boolean) {
    this.recipesList.first.showAdvancedSearchDialog(this.recipesList.first.emptyRecipe);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 5000});
  }
  // endregion

  tryToLogUserIn(user: UserBasic) {
    this.service.getUserByLoginAndPassword(user).subscribe( (response) => {
      if (response) {
        this.isLogged = response.isActive;
        this.hasAdminAccess = response.isAdmin;

        if (!this.isLogged) {
          this.openSnackBar('Użytkownik jest nieaktywny. Skontaktuj się z administratorem.', 'Ok');
        }
      } else {
        this.openSnackBar('Nieprawidłowe dane logowania', 'Ok');
      }
    });
  }

  logout() {
    window.location.reload();
  }

}
