import {Product} from 'src/app/models/Product';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductsService} from '../../services/products.service';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/Recipe';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {

  products: Product[];

  constructor(private data: ProductsService) {
  }

  displayedColumns: string[] = ['name', 'protein', 'carbs', 'fat', 'kcal'];
  dataSource: MatTableDataSource<Product>;
  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.refreshDataSource('');
  }

  applyNameFilter(filter: string) {
    this.refreshDataSource(filter);
  }

  refreshDataSource(filter: string) {
    this.isLoading = true;
    this.data.getProducts(filter).subscribe(
      (data) => {
        this.products = data;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      });
  }

}
