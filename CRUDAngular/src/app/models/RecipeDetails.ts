import {Product} from "./Product";
import {Ingredient} from "./Ingredient";

export interface  RecipeDetails {
  name: string;
  type: string;
  ingredients: Ingredient[];
  description: string;
}
