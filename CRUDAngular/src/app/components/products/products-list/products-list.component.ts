import {Product} from 'src/app/models/Product';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductsService} from '../../../services/products.service';
import {MatDialog} from '@angular/material';
import {ProductEditComponent} from '../product-edit/product-edit.component';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit {

  @Input() adminAccess: boolean;
  products: Product[];
  emptyProduct: Product = new Product('', 0, 0, 0, 0);

  displayedColumns: string[] = ['productname', 'protein', 'carbs', 'fat', 'kcal', 'edit'];
  dataSource: MatTableDataSource<Product>;
  isLoading = true;

  constructor(private data: ProductsService, public dialog: MatDialog) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    console.log('Admin acess: ' + this.adminAccess);
    if (this.adminAccess) {
      this.displayedColumns.push('delete');
    }
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


  // region Functions | Dialogs openers
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
        const newProduct = new Product(result.productname, result.protein, result.carbs, result.fat, result.kcal);
        if (product.productname === '') {
          this.createProduct(newProduct);
        } else {
          this.updateProduct(product.productname, newProduct);
        }
      }
    });
  }

  showProductDeleteConfirmationDialog(product: Product): void {
    const editDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Usuń',
        message: 'Czy na pewno chcesz usunąć produkt?'
      }
    });

    editDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(product.productname);
      }
    });
  }
  // endregion


  // region Functions | Data manipulators
  createProduct(product: Product) {
    this.data.createProduct(product).subscribe(response => {
      console.log(response);
    });
  }

  updateProduct(name: string, product: Product) {
    this.data.updateProduct(name, product).subscribe(response => {
      console.log(response);
    });
  }

  deleteProduct(name: string) {
    this.data.deleteProduct(name).subscribe(response => {
      console.log(response);
    });
  }
  // endregion
}
