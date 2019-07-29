import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Recipe} from 'src/app/models/Recipe';
import {Ingredient} from 'src/app/models/Ingredient';
import {Validator} from 'src/app/models/Validator';

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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateRecipe(recipe: Recipe): boolean {
    const validator = new Validator();
    return validator.isRecipeValid(recipe);
  }
}
