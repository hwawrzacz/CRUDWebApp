import { ProductsInRecipes } from './ProductsInRecipes';

export class Product {

    name: string;
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
    amount: number;
    recipes: ProductsInRecipes[];

    // constructor(name: string, protein: number, carbs: number, fat: number, kcal: number, recipes: ProductsInRecipes[]){
    //     this.name = name;
    //     this.protein = protein;
    //     this.carbs = carbs;
    //     this.fat = fat;
    //     this.recipes = recipes;
    //     this.recipes = recipes;
    // }
}
