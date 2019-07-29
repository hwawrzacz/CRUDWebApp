import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Recipe} from '../../../models/Recipe';
import {Ingredient} from '../../../models/Ingredient';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdvancedSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe) {
  }

  ngOnInit() { }

  onNoClick() {
    this.dialogRef.close();
  }

  validateIngredientList(ingredients: Ingredient[]) {
    if (ingredients.length > 0) { return true; }
    return false;
  }
}
