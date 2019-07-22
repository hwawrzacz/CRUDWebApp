import {Product} from "./Product";
import {ProductsInRecipes} from "./ProductsInRecipes";

export interface  RecipeDetails {
  name: string;
  type: string;
  ingredients: ProductsInRecipes[];
  description: string;
}
