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
import {Ingredient} from '../../../models/Ingredient';
import {DatePipe} from '@angular/common';

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

  constructor(private data: RecipesService,
              public dialog: MatDialog,
              public datepipe: DatePipe) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.applyNameFilter('');
  }

  returnEmptyRecipe(): Recipe {
    return this.emptyRecipe = new Recipe('', '', new Date(), '', []);
  }

  // region Functions | Dialog openers
  showRecipeDetailsDialog(recipe: Recipe): void {
    console.log(recipe);
    this.dialog.open(RecipeDetailsComponent, {
      width: 'auto',
      data: recipe
    });
  }


  showRecipeEditDialog(recipe: Recipe): void {
    const editDialogRef = this.dialog.open(RecipeEditComponent, {
      width: '80%',
      data: recipe
      //   {
      //   recipeid: recipe.recipeid,
      //   name: recipe.name,
      //   type: recipe.type,
      //   description: recipe.description,
      //   additiondate: recipe.additiondate,
      //   ingredients: recipe.ingredients,
      // }
    });

    editDialogRef.afterClosed().subscribe((result: Recipe) => {
      if (result != null) {
        if (result.recipeid === 0) { // new recipe is being created
          this.addRecipe(result);
        } else {
          this.updateRecipe(result);
        }
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

    advancedDialogRef.afterClosed().subscribe((result: Ingredient[]) => {
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
        this.refreshDataSource(data);
      });
  }


  applyIngredientFilter(ingredientsNames: string[]) {
    this.isLoading = true;
    this.data.getRecipesByIngredients(ingredientsNames).subscribe(
      (data) => {
        this.refreshDataSource(data);
      });
  }


  refreshDataSource(data: Recipe[]) {
    this.recipes = data;
    this.dataSource = new MatTableDataSource<Recipe>(this.recipes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoading = false;
  }


  addRecipe(recipe: Recipe): void {
    console.log(recipe);
    this.data.addRecipe(recipe).subscribe((response) => {
      console.log(response);
    });
  }


  updateRecipe(recipe: Recipe): void {
    console.log(recipe);
    this.data.updateRecipe(recipe).subscribe((response) => {
      console.log(response);
    });
  }

  // endregion


  // region Helpers
  getIngredientsNamesList(ingredients: Ingredient[]): string[] {
    const names: string[] = [];

    ingredients.forEach((ingredient) => {
      names.push(ingredient.product.productname);
    });

    return names;
  }

  // endregion
}
