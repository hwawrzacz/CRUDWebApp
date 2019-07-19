import {Recipe} from 'src/app/models/Recipe';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RecipesService} from '../../services/recipes.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RecipeDetailsComponent} from '../recipe-details/recipe-details.component';
import {Observable} from 'rxjs';
import {IRecipeDetails} from '../../models/IRecipeDetails';
import {Product} from '../../models/Product';
import {RecipeEditComponent} from '../recipe-edit/recipe-edit.component';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})

export class RecipesListComponent implements OnInit {

  emptyRecipe: Recipe = new Recipe();
  recipes: Recipe[];
  dataSource: MatTableDataSource<Recipe>;
  displayedColumns: string[] = ['id', 'name', 'type', 'additiondate', 'details', 'edit', 'delete'];
  isLoading = true;


  constructor(private data: RecipesService, public dialog: MatDialog) {
  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.refreshDataSource('');
  }

  applyNameFilter(filter: string) {
    this.refreshDataSource(filter);
  }

  refreshDataSource(filter: string) {
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

  showRecipeDetailsDialog(recipe: Recipe): void {
    const detailsDialogRef = this.dialog.open(RecipeDetailsComponent, {
      width: 'auto',
      data: {name: recipe.name, type: recipe.type, ingredients: recipe.ingredients, description: recipe.description}
    });

    detailsDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showRecipeEditDialog(recipe: Recipe): void {
    const editDialogRef = this.dialog.open(RecipeEditComponent, {
      width: '80%',
      data: {
        recipeid: recipe.recipeid,
        name: recipe.name,
        type: recipe.type,
        ingredients: recipe.ingredients,
        description: recipe.description
      }
    });

    editDialogRef.afterClosed().subscribe((result: Recipe) => {
      if (result.recipeid > 0) {
        this.updateRecipe(result.recipeid);
      }
    });
  }

  updateRecipe(recipeid: number) {
    console.log('Edit recipe ' + recipeid);
  }
}
