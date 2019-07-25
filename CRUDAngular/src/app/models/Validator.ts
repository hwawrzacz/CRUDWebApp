import {Ingredient} from './Ingredient';
import {User} from './User';
import {Recipe} from './Recipe';
import {Product} from './Product';
import {TransferredIngredient} from './TransferredIngredient';

export class Validator {

  // region Ingredient amount
  isUnitValid(unit: string): boolean {
    const regexUnit = /^g|l|(szklanka)|(łyżeczka)|(łyżka stołowa)|(szczypta)$/;
    return regexUnit.test(unit);
  }

  isIngredientAmountValid(amount: number): boolean {
    return (amount > 0);
  }

  isIngredientValid(ingredient: TransferredIngredient): boolean {
    const isNameValid = this.isProductNameValid(ingredient.productname);
    const isAmountValid = this.isIngredientAmountValid(ingredient.amount);
    const isUnitValid = this.isUnitValid(ingredient.unit);

    return (isNameValid && isAmountValid && isUnitValid);
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

  isProductListValid(ingredients: Ingredient[]): boolean {
    return (ingredients.length > 0);
  }

  isProductValid(product: Product): boolean {
    const isNameValid = this.isProductNameValid(product.productname);
    const isProteinValid = this.isAmountValid(product.protein.toString());
    const isCarbsValid = this.isAmountValid(product.carbs.toString());
    const isFatValid = this.isAmountValid(product.fat.toString());
    const isKcalValid = this.isAmountValid(product.kcal.toString());

    return (isNameValid && isProteinValid && isCarbsValid && isFatValid && isKcalValid);
  }

  // endregion


  // region Recipe
  isDescriptionValid(description: string): boolean {
    return (description.length > 0);
  }

  isIngredientListValid(ingredients: Ingredient[]): boolean {
    return (ingredients.length > 0);
  }

  isRecipeTypeValid(type: string): boolean {
    const regexType = /^(Śniadanie)|(Obiad)|(Kolacja)|(Przekąska)$/;
    return regexType.test(type);
  }

  isRecipeValid(recipe: Recipe): boolean {
    const isNameValid = this.isNameValid(recipe.name);
    const isTypeValid = this.isRecipeTypeValid(recipe.type);
    const isListValid = this.isIngredientListValid(recipe.ingredients);
    const isDescValid = this.isDescriptionValid(recipe.description);

    return (isNameValid && isTypeValid && isListValid && isDescValid);
  }

  // endregion

  // region User
  isLoginValid(login: string): boolean {
    const regexLogin = /^[a-z]{6}$/;
    return regexLogin.test((login));
  }

  isUserValid(user: User): boolean {
    const loginValid = this.isLoginValid(user.login);
    const fnameValid = this.isNameValid(user.firstName);
    const lnameValid = this.isNameValid(user.lastName);

    return (loginValid && fnameValid && lnameValid);
  }

  // endregion

  // common
  isNameValid(name: string): boolean {
    const regexName = /^[A-ZĄĆĘŁŃÓŚŻŹ][A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź \,\-]{0,100}$/;
    return regexName.test(name);
  }
}
