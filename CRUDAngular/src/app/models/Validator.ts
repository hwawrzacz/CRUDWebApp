import {TransferredIngredient} from "./TransferredIngredient";

export class Validator {

  // region Ingredient amount
  isAmountValid(amount: string): boolean {
    const regexAmount = /^(?!\-)(([0-9]+[\.\,][0-9]+)|([1-9][0-9]*))$/;
    return regexAmount.test(amount);
  }

  isUnitValid(unit: string): boolean {
    const regexUnit = /^g|l|(szklanka)|(łyżeczka)|(łyżka stołowa)|(szczypta)$/;
    return regexUnit.test(unit);
  }

  // endregion


  // region Recipe
  isNameValid(name: string): boolean {
    const regexName = /^[A-ZĄĆĘŁŃÓŚŻŹ][A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź \,\-]{0,100}$/;
    return regexName.test(name);
  }

  isDescriptionValid(description: string) {
    let isDescriptionValid = false;

    if (description.length > 0) {
      isDescriptionValid = true;
    }

    return isDescriptionValid;
  }

  isIngredientListValid(ingredients: TransferredIngredient[]) {
    let isIngredientListValid = false;

    if (ingredients.length > 0) {
      isIngredientListValid = true;
    }

    return isIngredientListValid;
  }
  // endregion
}
