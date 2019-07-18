import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TransferredIngredient} from '../../models/TransferredIngredient';

@Component({
  selector: 'app-ingredient-amount-dialog',
  templateUrl: './ingredient-amount-dialog.component.html',
  styleUrls: ['./ingredient-amount-dialog.component.scss']
})
export class IngredientAmountDialogComponent {

  units: string[] = ['g', 'l', 'szklanka', 'łyżeczka', 'łyżka stołowa', 'szczypta'];

  constructor(
    public dialogRef: MatDialogRef<IngredientAmountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransferredIngredient) {
  }

  onNoClick(): any {
    this.dialogRef.close();
  }


  validateIngredient(ingredient: TransferredIngredient): boolean {
    const regexAmount = /^(?!\-)(([0-9]+[\.\,][0-9]+)|([1-9][0-9]*))$/;
    const regexUnit = /^g|l|(szklanka)|(łyżeczka)|(łyżka stołowa)|(szczypta)$/;

    const amountValid = regexAmount.test(ingredient.amount + '');
    const unitValid = regexUnit.test(ingredient.unit);

    return (amountValid && unitValid);
  }
}
