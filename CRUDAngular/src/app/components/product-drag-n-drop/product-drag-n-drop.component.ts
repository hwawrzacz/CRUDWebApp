import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {IngredientAmountDialogComponent} from '../ingredient-amount-dialog/ingredient-amount-dialog.component';
import {ProductsService} from '../../services/products.service';
import {TransferredIngredient} from '../../models/TransferredIngredient';
import {Product} from "../../models/Product";

@Component({
  selector: 'app-product-drag-n-drop',
  templateUrl: './product-drag-n-drop.component.html',
  styleUrls: ['./product-drag-n-drop.component.scss']
})

export class ProductDragNDropComponent implements OnInit {

  @Input() ingredients: TransferredIngredient[];

  selectedProducts: TransferredIngredient[];
  allProducts: TransferredIngredient[] = [];

  constructor(private data: ProductsService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit(): void {
    this.selectedProducts = this.ingredients;
    this.refreshDataSource('');
  }


  applyNameFilter(filter: string) {
    this.refreshDataSource(filter);
  }


  refreshDataSource(filter: string) {
    this.data.getProductsToTransfer(filter).subscribe(
      (data) => {
        this.allProducts = data;
      });
  }


  drop(event: CdkDragDrop<TransferredIngredient[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const newProduct = event.previousContainer.data[event.previousIndex];
      if (!this.isProductAdded(newProduct)) {
        this.showIngredientAmountDialog(newProduct);
      } else {
        this.openSnackBar('Składnik został już dodany', 'Ok');
      }
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }


  showIngredientAmountDialog(ingredient: TransferredIngredient): void {
    const dialogRef = this.dialog.open(IngredientAmountDialogComponent, {
      width: 'auto',
      data: {productname: ingredient.productname, amount: ingredient.amount, unit: ingredient.unit}
    });

    dialogRef.afterClosed().subscribe((result: TransferredIngredient) => {
      if (result != null) {
        if (this.isProductAdded(result)) {
          this.deleteItem(result);
        }
        this.selectedProducts.push(result);
      }
    });
  }


  deleteItem(item: TransferredIngredient) {
    const index = this.selectedProducts.indexOf(item);
    this.selectedProducts.splice(index, 1);
  }


  editSelectedItem(item: TransferredIngredient) {
    this.showIngredientAmountDialog(item);
  }


  removeFromSelectedProducts(item) {
    const index = this.selectedProducts.indexOf(item);
    this.selectedProducts.splice(index, 1);
  }


  isProductAdded(newProduct: TransferredIngredient): boolean {
    let check = 0;

    this.selectedProducts.forEach((product) => {
      if (product.productname === newProduct.productname) {
        check++;
      }
    });

    if (check === 0) {
      console.log('product does not exists');
      return false;
    }
    console.log('product exists');
    return true;
  }
}
