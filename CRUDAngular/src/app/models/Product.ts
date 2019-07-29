import {Ingredient} from './Ingredient';

export class Product {
  productname: string;
  protein: number;
  carbs: number;
  fat: number;
  kcal: number;
  recipes: Ingredient[];

  constructor(productname: string = '', protein: number = 0, carbs: number = 0, fat: number = 0, kcal: number = 0, recipes: Ingredient[] = []) {
    this.productname = productname;
    this.protein = protein;
    this.carbs = carbs;
    this.fat = fat;
    this.kcal = kcal;
    this.recipes = recipes;
  }

  public toString(): string {
    return 'Product: ' + this.productname + ' ' + this.protein + ' ' + this.carbs + ' ' + this.fat + ' ' + this.kcal;
  }
}
