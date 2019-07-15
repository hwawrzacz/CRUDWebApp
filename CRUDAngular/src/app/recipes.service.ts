import { Injectable } from '@angular/core';
import {Recipe} from '../models/Recipe';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>("http://localhost:8080/recipes/getallrecipesbyname?name=");
  }
}
