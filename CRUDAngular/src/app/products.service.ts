import { Injectable } from '@angular/core';
import {Product} from './Models/Product';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8080/recipes/getallproductsbyname?name=");
  }
}
