import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Recipe} from '../../models/Recipe';
import {TransferredIngredient} from '../../models/TransferredIngredient';
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

  recipesTypes = ['Śniadanie', 'Obiad', 'Kolacja', 'Przekąska'];

  ngOnInit() {
    console.log('id: ' + this.recipe.recipeid);
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

  validateRecipe(recipe: Recipe): boolean{
    const regexName = /^[A-ZĄĆĘŁŃÓŚŻŹ][A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź \,\-]{0,100}$/;
    const isNameValid = regexName.test(recipe.name);
    let isDescriptionValid = false;
    let isIngredientListValid = false;
    if (recipe.description.length > 0) { isDescriptionValid = true; }
    if (recipe.ingredients.length > 0) { isIngredientListValid = true; }

    return (isNameValid && isDescriptionValid && isIngredientListValid);
  }

  returnRecipe(recipe: Recipe): Recipe {
    return recipe;
  }
}
