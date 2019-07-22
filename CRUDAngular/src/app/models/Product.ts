import { ProductsInRecipes } from './ProductsInRecipes';

export class Product {

    //name: string;
    productname: string;
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
    recipes: ProductsInRecipes[];

    constructor(name: string, protein: number, carbs: number, fat: number, kcal: number, recipes: ProductsInRecipes[]) {
        //this.name = name;
        this.productname = name;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.kcal = kcal;
        this.recipes = recipes;
    }
}
