import { ProductsInRecipes } from './ProductsInRecipes';

export class Recipe {

    recipeid: number;
    name: string;
    type: string;
    additiondate: Date;
    ingredients: ProductsInRecipes[];
    description: string;

    // constructor(recipeid?: number, name?: string, additiondate?: Date, type?: string, products?: ProductsInRecipes[], description?: string){
    //     this.recipeid = recipeid;
    //     this.name = name;
    //     this.additiondate = additiondate;
    //     this.type = type;
    //     this.products = products;
    //     this.description = description;
    // }
}
