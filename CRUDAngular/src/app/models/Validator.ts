import {ProductsInRecipes} from './ProductsInRecipes';

export class Validator {

  // region Ingredient amount
  isUnitValid(unit: string): boolean {
    const regexUnit = /^g|l|(szklanka)|(łyżeczka)|(łyżka stołowa)|(szczypta)$/;
    return regexUnit.test(unit);
  }
  // endregion


  // region Product
  isProductNameValid(name: string): boolean {
    const regexName = /^[a-ząćęłńóśżź\,\.\ \  %]{1,100}$/;
    return regexName.test(name);
  }

  isMacroValid(macro: string): boolean {
    const regexAmount = /^(?!\-)(([0-9]+[\.\,][0-9]+)|([0-9]+))$/;
    return regexAmount.test(macro);
  }

  isAmountValid(amount: string): boolean {
    const regexAmount = /^(?!\-)(([0-9]+[\.\,][0-9]+)|([1-9][0-9]*))$/;
    return regexAmount.test(amount);
  }

  isProductListValid(ingredients: ProductsInRecipes[]) {
    return (ingredients.length > 0);
  }
  // endregion


  // region Recipe
  isRecipeNameValid(name: string): boolean {
    const regexName = /^[A-ZĄĆĘŁŃÓŚŻŹ][A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź \,\-]{0,100}$/;
    return regexName.test(name);
  }

  isDescriptionValid(description: string) {
    return (description.length > 0);
  }

  isIngredientListValid(ingredients: ProductsInRecipes[]) {
    return (ingredients.length > 0);
  }

  isRecipeTypeValid(type: string) {
    const regexType = /^(Śniadanie)|(Obiad)|(Kolacja)|(Przekąska)$/;
    return regexType.test(type);
  }
  // endregion
}
