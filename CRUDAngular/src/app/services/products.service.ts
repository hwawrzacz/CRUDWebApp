import { Injectable } from '@angular/core';
import {Product} from '../models/Product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ingredient} from "../models/Ingredient";

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

  baseUrl = 'http://localhost:8080/products/';

  constructor(private http: HttpClient) { }

  getProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'getallbyname?name=' + name);
  }

  createProduct(product: Product): Observable<any> {
    return (this.http.post(this.baseUrl + 'create', product, {responseType: 'text'}));
  }

  updateProduct(name: string, product: Product): Observable<any> {
    return (this.http.put(this.baseUrl + 'update?name=' + name, product, {responseType: 'text'}));
  }

  deleteProduct(name: string): Observable<any> {
    return (this.http.delete(this.baseUrl + 'delete?name=' + name, {responseType: 'text'}));
  }
}
