import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {IngredientAmountDialogComponent} from '../ingredient-amount-dialog/ingredient-amount-dialog.component';
import {ProductsService} from '../../services/products.service';
import {TransferredIngredient} from '../../models/TransferredIngredient';

@Component({
  selector: 'app-product-drag-n-drop',
  templateUrl: './product-drag-n-drop.component.html',
  styleUrls: ['./product-drag-n-drop.component.scss']
})

export class ProductDragNDropComponent implements OnInit {

  // region Fields
  selectedProducts: TransferredIngredient[];
  allProducts: TransferredIngredient[] = [];
  isLoading = true;
  getDetails = true;
  // endregion


  // region Decorators
  @Input() ingredientsInput: TransferredIngredient[];
  @Input() details: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Output() ingredientsChanged = new EventEmitter<TransferredIngredient[]>();

  // endregion


  constructor(private data: ProductsService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.selectedProducts = this.ingredientsInput;
    this.getDetails = this.details;
    this.refreshDataSource('');
  }


  drop(event: CdkDragDrop<TransferredIngredient[]>) {
    if (event.previousContainer !== event.container) { // if element is dropped on another container
      const newProduct = event.previousContainer.data[event.previousIndex];

      if (!this.isProductAdded(newProduct)) {

        if (this.getDetails) {
          this.showIngredientAmountDialog(newProduct, event.currentIndex);
        } else {
          this.selectedProducts.push(newProduct);
        }
      } else {
        this.openSnackBar('Składnik został już dodany', 'Ok');
      }
    }
  }


  emitIngredientsChangedEvent() {
    this.ingredientsChanged.emit(this.selectedProducts);
  }


  // region Functions | Dialog openers
  showIngredientAmountDialog(ingredient: TransferredIngredient, index: number): void {
    const dialogRef = this.dialog.open(IngredientAmountDialogComponent, {
      width: 'auto',
      data: {productname: ingredient.productname, amount: ingredient.amount, unit: ingredient.unit}
    });

    dialogRef.afterClosed().subscribe((result: TransferredIngredient) => {
      if (result != null) {
        if (this.isProductAdded(result)) {
          this.replaceProduct(result, index);
        } else {
          this.insertProduct(result, index);
        }
      }
    });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

  // endregion


  // region Functions | Called from HTML
  editSelectedProduct(item: TransferredIngredient) {
    this.showIngredientAmountDialog(item, this.getProductIndex(item));
  }

  preventDrop(): boolean {
    return false;
  }

  // endregion


  // region Functions | Helpers
  getProductIndex(product: TransferredIngredient): number {
    return this.selectedProducts.indexOf(product);
  }


  isProductAdded(newProduct: TransferredIngredient): boolean {
    let check = 0;

    this.selectedProducts.forEach((product) => {
      if (product.productname === newProduct.productname) {
        check++;
      }
    });

    if (check === 0) {
      return false;
    }
    return true;
  }

  // endregion


  // region Functions | Data manipulators
  applyNameFilter(filter: string) {
    this.refreshDataSource(filter);
  }


  refreshDataSource(filter: string) {
    this.isLoading = true;
    this.data.getProductsToTransfer(filter).subscribe(
      (data) => {
        this.allProducts = data;
        this.isLoading = false;
      });
  }


  insertProduct(product: TransferredIngredient, index: number) {
    this.selectedProducts.splice(index, 0, product);
    this.emitIngredientsChangedEvent();
  }


  replaceProduct(product: TransferredIngredient, index: number) {
    this.selectedProducts.splice(index, 1, product);
    this.emitIngredientsChangedEvent();
  }


  // this function does not get index as a parameter, because it is called from HTML
  deleteProduct(product: TransferredIngredient) {
    const index = this.getProductIndex(product);
    this.selectedProducts.splice(index, 1);
    this.emitIngredientsChangedEvent();
  }

  // endregion
}
