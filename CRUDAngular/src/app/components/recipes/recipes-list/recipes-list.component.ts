import {Recipe} from 'src/app/models/Recipe';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RecipesService} from '../../../services/recipes.service';
import {MatDialog} from '@angular/material/dialog';
import {RecipeDetailsComponent} from '../recipe-details/recipe-details.component';
import {RecipeEditComponent} from '../recipe-edit/recipe-edit.component';
import {AdvancedSearchComponent} from '../advanced-search/advanced-search.component';
import {TransferredIngredient} from '../../../models/TransferredIngredient';
import {Ingredient} from '../../../models/Ingredient';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})

export class RecipesListComponent implements OnInit {

  // region Fields
  emptyRecipe: Recipe;
  recipes: Recipe[];
  dataSource: MatTableDataSource<Recipe>;
  displayedColumns: string[] = ['id', 'name', 'type', 'additiondate', 'details', 'edit', 'delete'];
  isLoading = true;

  // endregion

  constructor(private data: RecipesService, public dialog: MatDialog) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.applyNameFilter('');
  }

  returnEmptyRecipe(): Recipe {
    return this.emptyRecipe = new Recipe('', '', '', [], '');
  }

  // region Functions | Dialog openers
  showRecipeDetailsDialog(recipe: Recipe): void {
    const detailsDialogRef = this.dialog.open(RecipeDetailsComponent, {
      width: 'auto',
      data: {name: recipe.name, type: recipe.type, ingredients: recipe.ingredients, description: recipe.description}
    });
  }


  showRecipeEditDialog(recipe: Recipe): void {
    const editDialogRef = this.dialog.open(RecipeEditComponent, {
      width: '80%',
      data: {
        recipeid: recipe.recipeid,
        name: recipe.name,
        type: recipe.type,
        additiondate: recipe.additiondate,
        ingredients: recipe.ingredients,
        description: recipe.description
      }
    });
    console.log("show:");
    console.log(recipe);

    editDialogRef.afterClosed().subscribe((result: Recipe) => {
      if (result != null) {
        console.log("after: ");
        console.log(result);
        this.addRecipe(result);
      }
    });
  }


  showAdvancedSearchDialog(recipe: Recipe): void {
    const advancedDialogRef = this.dialog.open(AdvancedSearchComponent, {
      width: '80%',
      data: {
        ingredients: recipe.ingredients
      }
    });

    advancedDialogRef.afterClosed().subscribe((result: TransferredIngredient[]) => {
      if (result != null) {
        const ingredientsNames = this.getIngredientsNamesList(result);
        this.applyIngredientFilter(ingredientsNames);
      }
    });
  }

  // endregion


  // region Functions | Data manipulators
  applyNameFilter(filter: string) {
    this.isLoading = true;
    this.data.getRecipes(filter).subscribe(
      (data) => {
        this.recipes = data;
        this.dataSource = new MatTableDataSource<Recipe>(this.recipes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }


  applyIngredientFilter(ingredientsNames: string[]) {
    this.isLoading = true;
    this.data.getRecipesByIngredients(ingredientsNames).subscribe(
      (data) => {
        this.recipes = data;
        this.dataSource = new MatTableDataSource<Recipe>(this.recipes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }


  addRecipe(recipe: Recipe): void {
    console.log("add recipe: ");
    console.log(recipe);
    this.data.addRecipe(recipe).subscribe((response) => {
      console.log(response);
    });
  }

  // endregion


  // region Helpers
  getIngredientsNamesList(ingredients: TransferredIngredient[]): string[] {
    const names: string[] = [];

    ingredients.forEach((ingredient) => {
      names.push(ingredient.productname);
    });

    return names;
  }

  convertTransferredListToingredientsList(transferred: TransferredIngredient[]): Ingredient[] {
    const ingredients: Ingredient[] = [];
    transferred.forEach((element) => {
      ingredients.push(new Ingredient((element)));
    });
    return ingredients;
  }

  // endregion
}
