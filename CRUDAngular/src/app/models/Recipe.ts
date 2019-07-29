import {Ingredient} from './Ingredient';

export class Recipe {
  recipeid: number;
  name: string;
  type: string;
  additiondate: Date;
  description: string;
  ingredients: Ingredient[];

  constructor(name: string = '', type: string = '', additiondate: Date = new Date(), description: string = '', ingredients: Ingredient[] = []) {
    this.recipeid = 0;
    this.name = name;
    this.type = type;
    this.additiondate = additiondate;
    this.description = description;
    this.ingredients = ingredients;
  }
}
