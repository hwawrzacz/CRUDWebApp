import {Component, Inject, OnInit} from '@angular/core';
import {ProductsInRecipes} from "../../models/ProductsInRecipes";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-ingredient-amount-dialog',
  templateUrl: './ingredient-amount-dialog.component.html',
  styleUrls: ['./ingredient-amount-dialog.component.scss']
})
export class IngredientAmountDialogComponent {

  units: string[] = ['g', 'l', 'szklanka', 'łyżeczka', 'łyżka stołowa'];

  constructor(
    public dialogRef: MatDialogRef<IngredientAmountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductsInRecipes) {
  }

  onNoClick(): any {
    this.dialogRef.close();
  }
}
