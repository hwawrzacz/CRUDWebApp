import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IRecipeDetails} from '../../models/IRecipeDetails';
import {IngredientAmountDialogComponent} from "../ingredient-amount-dialog/ingredient-amount-dialog.component";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(
  public dialogRef: MatDialogRef<RecipeEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: IRecipeDetails) {}

  ngOnInit() {
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }
}
