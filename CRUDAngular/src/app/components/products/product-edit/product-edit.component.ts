import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Product} from 'src/app/models/Product';
import {Validator} from 'src/app/models/Validator';

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

  validateProduct(): boolean {
    const validator = new Validator();
    return validator.isProductValid(this.product);
  }
}
