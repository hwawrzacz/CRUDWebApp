import {Product} from "./Product";
import {ProductsInRecipes} from "./ProductsInRecipes";

export interface  IRecipeDetails {
  name: string;
  type: string;
  ingredients: ProductsInRecipes[];
  description: string;
}
