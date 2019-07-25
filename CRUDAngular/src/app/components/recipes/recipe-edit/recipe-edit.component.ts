import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Recipe} from 'src/app/models/Recipe';
import {TransferredIngredient} from 'src/app/models/TransferredIngredient';
import {Ingredient} from 'src/app/models/Ingredient';
import {Validator} from 'src/app/models/Validator';
import {User} from "../../../models/User";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RecipeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe) {
  }

  recipesTypes = ['Śniadanie', 'Obiad', 'Kolacja', 'Przekąska'];

  ngOnInit() {
    console.log('Editing recipe with id: ' + this.recipe.recipeid);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateIngredients(changedIngredients: TransferredIngredient[]) {
    const convertedIngredients: Ingredient[] = [];

    changedIngredients.forEach((ingredient) => {
      convertedIngredients.push(new Ingredient(ingredient));
    });

    this.recipe.ingredients = convertedIngredients;
  }

  validateRecipe(recipe: Recipe): boolean {
    const validator = new Validator();
    return validator.isRecipeValid(recipe);
  }
}
