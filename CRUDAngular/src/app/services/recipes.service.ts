import {Injectable} from '@angular/core';
import {Recipe} from '../models/Recipe';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  baseUrl = 'http://localhost:8080/recipes/';
  header = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  }

  constructor(private http: HttpClient) {
  }

  getRecipes(name: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl + 'getallrecipesbyname?name=' + name);
  }

  getRecipesByIngredients(ingredientsNames: string[]): Observable<Recipe[]> {
    return this.http.post<Recipe[]>(this.baseUrl + 'getbyingredients', ingredientsNames);
  }

  addRecipe(recipe: Recipe): Observable<any> {
    console.log(recipe);
    return this.http.post(this.baseUrl + 'create', recipe, {responseType: 'text'});
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    console.log(recipe);
    return this.http.put(this.baseUrl + 'update', recipe, {responseType: 'text'});
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'delete?id=' + id, {responseType: 'text'});
  }

}
