import {Component, ViewChild} from '@angular/core';
import {RecipesListComponent} from "./components/recipes-list/recipes-list.component";
import {ProductsListComponent} from "./components/products-list/products-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'CRUDAngular';

  constructor() {
  }

  @ViewChild(RecipesListComponent, {static: true}) recipesList: RecipesListComponent;
  @ViewChild(ProductsListComponent, {static: true}) productList: ProductsListComponent;

  // region Header buttons event handlers
  openNewRecipeDialog(value: boolean) {
    this.recipesList.showRecipeEditDialog(this.recipesList.emptyRecipe);
  }

  openNewProductDialog(value: boolean) {
    this.productList.showProductEditDialog(this.productList.emptyProduct);
  }

  openAdvancedSearchDialog(value: boolean) {
    console.log('Advanced search');
  }

  logout(value: boolean) {
    console.log('Log out');
  }
  // endregion

}
