import {Ingredient} from './Ingredient';

export class TransferredIngredient {
  productname: string;
  amount: number;
  unit: string;

  constructor(productname: string, amount: number, unit: string) {
    this.productname = productname;
    this.amount = amount;
    this.unit = unit;
  }
}
