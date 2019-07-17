import {ProductsInRecipes} from './ProductsInRecipes';

export class TransferredIngredient {
  productname: string;
  amount: number;
  unit: string;
  protein: number;
  carbs: number;
  fat: number;
  kcal: number;
  recipes: ProductsInRecipes[];

  constructor(productname: string, amount: number, unit: string) {
    this.productname = productname;
    this.amount = amount;
    this.unit = unit;
  }
}
