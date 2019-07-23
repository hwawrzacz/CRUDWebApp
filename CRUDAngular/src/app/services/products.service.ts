import { Injectable } from '@angular/core';
import {Product} from '../models/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TransferredIngredient} from '../models/TransferredIngredient';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

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
    console.log(product.toString());

    return this.http.post<Product>(this.baseUrl, product, httpOptions);

    const jsonProduct = JSON.stringify(product);
    console.log(jsonProduct);
    return (this.http.put<Product>(this.baseUrl + 'addnewproduct/', jsonProduct, httpOptions  ));
  }
}
