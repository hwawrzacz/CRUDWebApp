import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Recipe} from '../../../models/Recipe';
import {TransferredIngredient} from '../../../models/TransferredIngredient';
import {ProductsInRecipes} from '../../../models/ProductsInRecipes';
import {Validator} from '../../../models/Validator';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(
  public dialogRef: MatDialogRef<RecipeEditComponent>,
  @Inject(MAT_DIALOG_DATA) public recipe: Recipe) {}

  recipesTypes = ['Śniadanie', 'Obiad', 'Kolacja', 'Przekąska'];

  ngOnInit() {
    console.log('Editing recipe with id: ' + this.recipe.recipeid);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateIngredients(changedIngredients: TransferredIngredient[]) {
    const convertedIngredients: ProductsInRecipes[] = [];

    changedIngredients.forEach( (ingredient) => {
      convertedIngredients.push(new ProductsInRecipes(ingredient));
    });

    this.recipe.ingredients = convertedIngredients;
  }

  validateRecipe(recipe: Recipe): boolean {
    const validator = new Validator();
    return validator.isRecipeValid(recipe);
  }
}
