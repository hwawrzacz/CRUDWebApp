import {ProductsInRecipes} from './ProductsInRecipes';

export class Product {

  // name: string;
  productname: string;
  protein: number;
  carbs: number;
  fat: number;
  kcal: number;

  recipes: ProductsInRecipes[];

  constructor(productname?: string, protein?: number, carbs?: number, fat?: number, kcal?: number) {
    this.productname = name;
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
