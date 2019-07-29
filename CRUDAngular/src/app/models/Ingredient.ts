import { Recipe } from './Recipe';
import { TransferredIngredient } from './TransferredIngredient';
import {Product} from './Product';

export class Ingredient {
    product: Product = new Product();
    recipe: Recipe = new Recipe();
    amount: number;
    unit: string;

    constructor(productname: string) {
      this.product.productname = productname;
      this.amount = 0;
      this.unit = 'g';
    }

    // constructor(productname: string, amount: number, unit: string) {
    //   this.productname = productname;
    //   this.amount = amount;
    //   this.unit = unit;
    // }
}
