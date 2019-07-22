import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Product} from "../../models/Product";
import {Validator} from "../../models/Validator";

@Component({
  selector: 'app-edit-product',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductEditComponent>,
              @Inject(MAT_DIALOG_DATA) public product: Product) {}

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  validateProduct(product: Product): boolean {
    const validator = new Validator();
    const isNameValid = validator.isProductNameValid(this.product.productname + '');
    const isProteinValid = validator.isMacroValid(this.product.protein + '');
    const isCarbsValid = validator.isMacroValid(this.product.carbs + '');
    const isFatValid = validator.isMacroValid(this.product.fat + '');
    const isKcalValid = validator.isMacroValid(this.product.kcal + '');

    return (isNameValid && isProteinValid && isCarbsValid && isFatValid && isKcalValid);
  }
}
