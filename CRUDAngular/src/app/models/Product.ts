import {Ingredient} from './Ingredient';

export class Product {
  productname: string;
  protein: number;
  carbs: number;
  fat: number;
  kcal: number;
  // recipes: Ingredient[];

  constructor(productname?: string, protein?: number, carbs?: number, fat?: number, kcal?: number, recipes?: Ingredient[]) {
    this.productname = productname;
    this.protein = protein;
    this.carbs = carbs;
    this.fat = fat;
    this.kcal = kcal;
    // this.recipes = recipes;
  }

  public toString(): string {
    return 'Product: ' + this.productname + ' ' + this.protein + ' ' + this.carbs + ' ' + this.fat + ' ' + this.kcal;
  }
}
