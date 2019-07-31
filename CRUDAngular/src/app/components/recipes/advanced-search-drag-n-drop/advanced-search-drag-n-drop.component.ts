import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {IngredientAmountDialogComponent} from 'src/app/components/recipes/ingredient-amount-dialog/ingredient-amount-dialog.component';
import {ProductsService} from '../../../services/products.service';
import {Product} from '../../../models/Product';
import {ProductEditComponent} from 'src/app/components/products/product-edit/product-edit.component';
import {Ingredient} from '../../../models/Ingredient';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-advanced-search-drag-n-drop',
  templateUrl: './advanced-search-drag-n-drop.component.html',
  styleUrls: ['./advanced-search-drag-n-drop.component.scss']
})

export class AdvancedSearchDragNDropComponent implements OnInit {

  // region Fields
  selectedIngredients: Ingredient[];
  allProducts: Ingredient[];
  emptyProduct: Product = new Product('', 0, 0, 0, 0);
  isLoading = true;
  getDetails = true;
  // endregion


  // region Decorators
  @Input() ingredientsInput: Ingredient[];
  @Input() details: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();

  // endregion


  constructor(private data: ProductsService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.selectedIngredients = this.ingredientsInput;
    this.getDetails = this.details;
    this.refreshDataSource('');
  }


  drop(event: CdkDragDrop<Ingredient[]>) {
    if (event.previousContainer !== event.container) { // if element is dropped on another container
      const newIngredient = event.previousContainer.data[event.previousIndex];

      if (this.isIngredientAdded(newIngredient)) {
        this.openSnackBar('Składnik został już dodany', 'Ok');
      } else {
        this.selectedIngredients.push(newIngredient);
      }
    }
  }


  // region Functions | Dialog openers

  showIngredientDeleteConfirmationDialog(ingredient: Ingredient): void {
    const editDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Usuń',
        message: 'Czy na pewno chcesz usunąć składnik?'
      }
    });

    editDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(ingredient);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 3000});
  }

  // endregion


  // region Functions | Called from HTML
  emitIngredientsChangedEvent() {
    this.ingredientsChanged.emit(this.selectedIngredients);
  }

  preventDrop(): boolean {
    return false;
  }

  // endregion


  // region Functions | Helpers
  getProductIndex(product: Ingredient): number {
    return this.selectedIngredients.indexOf(product);
  }


    isIngredientAdded(newProduct: Ingredient): boolean {
    let check = 0;

    this.selectedIngredients.forEach((product) => {
      if (product.product.productname === newProduct.product.productname) {
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
    this.data.getProducts(filter).subscribe(
      (data) => {
        const ingredients = this.convertProductsToIngredients(data);
        this.allProducts = ingredients;
        this.isLoading = false;
      });
  }

  convertProductsToIngredients(products: Product[]): Ingredient[] {
    const ingredients: Ingredient[] = [];
    products.forEach( (product: Product) => {
      const ingredient = new Ingredient(product.productname);
      ingredients.push(ingredient);
    });
    return ingredients;
  }

  deleteProduct(product: Ingredient) {
    const index = this.getProductIndex(product);
    this.selectedIngredients.splice(index, 1);
    this.emitIngredientsChangedEvent();
  }

  // endregion
}
