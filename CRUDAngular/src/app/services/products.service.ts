import { Injectable } from '@angular/core';
import {Product} from '../models/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TransferredIngredient} from '../models/TransferredIngredient';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  baseUrl = 'http://localhost:8080/recipes/';

  constructor(private http: HttpClient) { }

  getProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'getallproductsbyname?name=' + name);
  }

  getProductsToTransfer(name: string): Observable<TransferredIngredient[]> {
    return this.http.get<TransferredIngredient[]>(this.baseUrl + 'getallproductsbyname?name=' + name);
  }

  saveProduct(product: Product): Observable<Product> {
    console.log('saving product');
    return this.http.post<Product>(this.baseUrl + 'addnewproduct/', product);
  }
}
