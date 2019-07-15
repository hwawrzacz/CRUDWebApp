import { ProductList } from "./ProductList";

export class Product{

    name: string;
    protein: number;
    carbs: number;
    fat: number;
    kcal: number;
    recipes: ProductList[];
    
    // constructor(name: string, protein: number, carbs: number, fat: number, kcal: number, recipes: ProductList[]){
    //     this.name = name;
    //     this.protein = protein;
    //     this.carbs = carbs;
    //     this.fat = fat;
    //     this.recipes = recipes;
    //     this.recipes = recipes;
    // }
}