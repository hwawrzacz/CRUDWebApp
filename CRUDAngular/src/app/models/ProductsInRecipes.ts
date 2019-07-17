import { Recipe } from './Recipe';
import { TransferredIngredient } from './TransferredIngredient';

export class ProductsInRecipes {

    productname: string;
    productid: string;
    amount: number;
    unit: string;
    recipes: Recipe[];

    constructor(data: TransferredIngredient) {
      this.productname = data.productname;
      this.amount = data.amount;
      this.unit = data.unit;
    }

    // constructor(productname: string, amount: number, unit: string) {
    //   this.productname = productname;
    //   this.amount = amount;
    //   this.unit = unit;
    // }
}
