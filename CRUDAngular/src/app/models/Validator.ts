import {Ingredient} from './Ingredient';
import {User} from './User';
import {Recipe} from './Recipe';
import {Product} from './Product';
import {UserBasic} from "./UserBasic";

export class Validator {

  // region Ingredient amount
  isUnitValid(unit: string): boolean {
    const regexUnit = /^g|l|(szklanka)|(łyżeczka)|(łyżka stołowa)|(szczypta)$/;
    return regexUnit.test(unit);
  }

  isIngredientAmountValid(amount: number): boolean {
    return (amount > 0);
  }

  isIngredientValid(ingredient: Ingredient): boolean {
    const isNameValid = this.isProductNameValid(ingredient.product.productname);
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
    if (macro !== null) {
      return regexAmount.test(macro);
    }
    return false;
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
    const isProteinValid = this.isMacroValid(product.protein.toString());
    const isCarbsValid = this.isMacroValid(product.carbs.toString());
    const isFatValid = this.isMacroValid(product.fat.toString());
    const isKcalValid = this.isMacroValid(product.kcal.toString());

    return (isNameValid && isProteinValid && isCarbsValid && isFatValid && isKcalValid);
  }

  // endregion


  // region Recipe
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
    const isDescValid = this.isTextNotEmptyOrWhitepace(recipe.description);

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

  isUserForLoginValid(user: UserBasic): boolean{
    const loginValid = this.isLoginValid(user.login);
    const passValid = this.isTextNotEmptyOrWhitepace(user.password);

    return (loginValid  && passValid);
  }

  // endregion

  // region Common
  isTextNotEmptyOrWhitepace(text: string): boolean {
    return (text.trim().length > 0);
  }

  isNameValid(name: string): boolean {
    const regexName = /^[A-ZĄĆĘŁŃÓŚŻŹ][A-ZĄĆĘŁŃÓŚŻŹa-ząćęłńóśżź \,\-]{0,100}$/;
    return regexName.test(name);
  }
  // endregion
}
