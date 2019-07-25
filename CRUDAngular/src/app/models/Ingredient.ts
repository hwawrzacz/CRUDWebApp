import { Recipe } from './Recipe';
import { TransferredIngredient } from './TransferredIngredient';
import {Product} from './Product';

export class Ingredient {

    product: Product;
    productname: string;
    recipe: Recipe;
    recipeid: string;
    amount: number;
    unit: string;

    constructor(ingredient: TransferredIngredient) {
      this.productname = ingredient.productname;
      this.amount = ingredient.amount;
      this.unit = ingredient.unit;
    }

    // constructor(productname: string, amount: number, unit: string) {
    //   this.productname = productname;
    //   this.amount = amount;
    //   this.unit = unit;
    // }
}
