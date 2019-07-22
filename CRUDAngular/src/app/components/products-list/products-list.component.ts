import {Product} from 'src/app/models/Product';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductsService} from '../../services/products.service';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/Recipe';
import {RecipeEditComponent} from "../recipe-edit/recipe-edit.component";
import {MatDialog} from "@angular/material";
import {ProductEditComponent} from "../product-edit/product-edit.component";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {

  products: Product[];
  emptyProduct: Product = new Product('', 0, 0, 0, 0, []);

  constructor(private data: ProductsService, public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['name', 'protein', 'carbs', 'fat', 'kcal', 'edit', 'delete'];
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


  showProductEditDialog(product: Product): void {
    const editDialogRef = this.dialog.open(ProductEditComponent, {
      width: '80%',
      data: {
        productname: product.productname,
        protein: product.protein,
        carbs: product.carbs,
        fat: product.fat,
        kcal: product.kcal
      }
    });

    editDialogRef.afterClosed().subscribe((result: Product) => {
      if (result != null) {
        this.updateProduct(result);
      }
    });
  }

  updateProduct(product: Product) {
    console.log(this.data.saveProduct(product));
  }
}
