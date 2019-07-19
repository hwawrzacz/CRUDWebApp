import {TransferredIngredient} from "./TransferredIngredient";
import {ProductsInRecipes} from "./ProductsInRecipes";

export class Validator {

  // region Ingredient amount
  isUnitValid(unit: string): boolean {
    const regexUnit = /^g|l|(szklanka)|(łyżeczka)|(łyżka stołowa)|(szczypta)$/;
    return regexUnit.test(unit);
  }

  // endregion


  // Product
  isProductListValid(ingredients: ProductsInRecipes[]) {
    let isIngredientListValid = false;

    if (ingredients.length > 0) {
      isIngredientListValid = true;
    }

    return isIngredientListValid;
  }


  // region Recipe
  isDescriptionValid(description: string) {
    let isDescriptionValid = false;

    if (description.length > 0) {
      isDescriptionValid = true;
    }

    return isDescriptionValid;
  }

  isIngredientListValid(ingredients: ProductsInRecipes[]) {
    let isIngredientListValid = false;

    if (ingredients.length > 0) {
      isIngredientListValid = true;
    }

    return isIngredientListValid;
  }


  isRecipeTypeValid(type: string) {
    const regexType = /^(Śniadanie)|(Obiad)|(Kolacja)|(Przekąska)$/;
    return regexType.test(type);
  }
  // endregion


  // Common
  isNameValid(name: string): boolean {
    const regexName = /^[A-ZĄĆĘŁŃÓŚŻŹ][A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź \,\-]{0,100}$/;
    return regexName.test(name);
  }

  isAmountValid(amount: string): boolean {
    const regexAmount = /^(?!\-)(([0-9]+[\.\,][0-9]+)|([1-9][0-9]*))$/;
    return regexAmount.test(amount);
  }
}
