import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TransferredIngredient} from '../../models/TransferredIngredient';
import {Validator} from '../../models/Validator';

@Component({
  selector: 'app-ingredient-amount-dialog',
  templateUrl: './ingredient-amount-dialog.component.html',
  styleUrls: ['./ingredient-amount-dialog.component.scss']
})
export class IngredientAmountDialogComponent {
  units: string[] = ['g', 'l', 'szklanka', 'łyżeczka', 'łyżka stołowa', 'szczypta'];

  constructor(
    public dialogRef: MatDialogRef<IngredientAmountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public ingredient: TransferredIngredient) {
  }

  onNoClick(): any {
    this.dialogRef.close();
  }


  validateIngredient(ingredient: TransferredIngredient): boolean {
    const validator = new Validator();
    const isAmountValid = validator.isAmountValid(this.ingredient.amount + '');
    const isUnitValid = validator.isUnitValid(this.ingredient.unit);

    return (isAmountValid && isUnitValid);
  }
}
