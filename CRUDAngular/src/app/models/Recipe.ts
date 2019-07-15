import { ProductList } from './ProductList';

export class Recipe{    

    recipeid: number;
    name: string;
    type: string;
    additiondate: Date;
    products: ProductList[];
    productsNames: string[];
    description: string;
    
    // constructor(recipeid?: number, name?: string, additiondate?: Date, type?: string, products?: ProductList[], description?: string){
    //     this.recipeid = recipeid;
    //     this.name = name;
    //     this.additiondate = additiondate;
    //     this.type = type;
    //     this.products = products;
    //     this.description = description;
    // }
}