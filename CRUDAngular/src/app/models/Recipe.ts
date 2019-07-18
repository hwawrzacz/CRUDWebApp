import { ProductsInRecipes } from './ProductsInRecipes';

export class Recipe {

    recipeid: number;
    name: string;
    type: string;
    additiondate: Date;
    ingredients: ProductsInRecipes[];
    description: string;

    constructor(name: string = '', additiondate: Date = new Date(), type: string = '', ingredients: ProductsInRecipes[] = [], description: string = '') {
        this.name = name;
        this.additiondate = additiondate;
        this.type = type;
        this.ingredients = ingredients;
        this.description = description;
    }
}
