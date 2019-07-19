import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TransferredIngredient} from '../../models/TransferredIngredient';
import {Recipe} from "../../models/Recipe";
import {ProductsInRecipes} from "../../models/ProductsInRecipes";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  Localingredients: TransferredIngredient[];

  constructor(
    public dialogRef: MatDialogRef<AdvancedSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe) {
  }

  ngOnInit() {
    // this.ingredients.forEach( (ingredient) => {
    //   console.log(ingredient.productname);
    // });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  validateIngredientList(ingredients: TransferredIngredient[]) {
    if (ingredients.length > 0) { return true; }
    return false;
  }

  searchByIngredients(ingredients: TransferredIngredient[]) {
    console.log('Search started');
  }
}
