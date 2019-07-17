import { Injectable } from '@angular/core';
import {Product} from '../models/Product';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TransferredIngredient} from "../models/TransferredIngredient";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/recipes/getallproductsbyname?name=' + name);
  }

  getProductsToTransfer(name: string): Observable<TransferredIngredient[]> {
    return this.http.get<TransferredIngredient[]>('http://localhost:8080/recipes/getallproductsbyname?name=' + name);
  }
}
