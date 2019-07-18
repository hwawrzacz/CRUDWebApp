import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Recipe} from '../../models/Recipe';
import {TransferredIngredient} from '../../models/TransferredIngredient';
import {forEachComment} from 'tslint';
import {ProductsInRecipes} from '../../models/ProductsInRecipes';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(
  public dialogRef: MatDialogRef<RecipeEditComponent>,
  @Inject(MAT_DIALOG_DATA) public recipe: Recipe) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateIngredients(changedIngredients: TransferredIngredient[]) {
    console.log('ingredients update');
    const convertedIngredients: ProductsInRecipes[] = [];

    changedIngredients.forEach( (ingredient) => {
      convertedIngredients.push(new ProductsInRecipes(ingredient));
    });

    this.recipe.ingredients = convertedIngredients;

    this.recipe.ingredients.forEach( (ingredient) => {
        console.log(ingredient.productname);
    });
  }
}
