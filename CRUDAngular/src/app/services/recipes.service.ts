import {Injectable} from '@angular/core';
import {Recipe} from '../models/Recipe';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  baseUrl = 'http://localhost:8080/recipes/';

  constructor(private http: HttpClient) {
  }

  getRecipes(name: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl + 'getallrecipesbyname?name=' + name);
  }

  getRecipesByIngredients(ingredientsNames: string[]): Observable<Recipe[]> {
    return this.http.post<Recipe[]>(this.baseUrl + 'getbyingredients', ingredientsNames);
  }

  addRecipe(recipe: Recipe): Observable<any> {
    console.log('Service: ');
    console.log(recipe);
    return this.http.post(this.baseUrl + 'create', recipe);
  }
}
