import { Ingredient } from './Ingredient';
export class Recipe {

    recipeid: number;
    name: string;
    type: string;
    additiondate: string;
    ingredients: Ingredient[];
    description: string;

    constructor(name: string = '', type: string = '', additiondate: string, ingredients: Ingredient[] = [], description: string = '') {
        this.name = name;
        this.type = type;
        this.additiondate = additiondate;
        this.ingredients = ingredients;
        this.description = description;
    }

    public toString(): string {
      let result = this.name + ' ' + this.type + '\n';

      this.ingredients.forEach( (ingredient) => {
        result += '    ' + ingredient.productname + '\n';
      });

      result += this.description;

      return result;
    }
}
