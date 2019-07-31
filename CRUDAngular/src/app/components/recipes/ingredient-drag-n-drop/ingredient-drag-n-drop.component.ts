import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {IngredientAmountDialogComponent} from '../ingredient-amount-dialog/ingredient-amount-dialog.component';
import {ProductsService} from '../../../services/products.service';
import {Product} from '../../../models/Product';
import {ProductEditComponent} from '../../products/product-edit/product-edit.component';
import {Ingredient} from '../../../models/Ingredient';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ingredient-drag-n-drop',
  templateUrl: './ingredient-drag-n-drop.component.html',
  styleUrls: ['./ingredient-drag-n-drop.component.scss']
})

export class IngredientDragNDropComponent implements OnInit {

  // region Fields
  selectedIngredients: Ingredient[];
  allProducts: Ingredient[];
  emptyProduct: Product;
  isLoading = true;
  // endregion


  // region Decorators
  @Input() ingredientsInput: Ingredient[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();

  // endregion


  constructor(private data: ProductsService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.selectedIngredients = this.ingredientsInput;
    this.refreshDataSource('');
  }

  returnEmptyProduct(): Product {
    return this.emptyProduct = new Product('', 0, 0, 0, 0);
  }

  drop(event: CdkDragDrop<Ingredient[]>) {
    if (event.previousContainer !== event.container) { // if element is dropped on another container
      const newIngredient = event.previousContainer.data[event.previousIndex];
      if (this.isIngredientAdded(newIngredient)) {
        this.openSnackBar('Składnik został już dodany', 'Ok');
      } else {
        // display the dialog in order to set the amount and unit of the specific ingredient
        this.showIngredientAmountDialog(newIngredient, event.currentIndex);
      }
    }
  }

  // region Functions | Dialog openers
  showIngredientAmountDialog(ingredient: Ingredient, index: number): void {
    const newIngredient = ingredient;
    const dialogRef = this.dialog.open(IngredientAmountDialogComponent, {
      width: 'auto',
      data: {
        product: {
          productname: ingredient.product.productname,
          protein: ingredient.product.protein,
          carbs: ingredient.product.carbs,
          fat: ingredient.product.fat,
          kcal: ingredient.product.kcal,
        },
        amount: ingredient.amount,
        unit: ingredient.unit
      }
    });

    dialogRef.afterClosed().subscribe((result: Ingredient) => {
      if (result != null) {
        if (this.isIngredientAdded(result)) {
          this.replaceProduct(result, index);
        } else {
          this.insertProduct(result, index);
        }
      }
    });
  }

  showProductCreateDialog(product: Product): void {
    const editDialogRef = this.dialog.open(ProductEditComponent, {
      width: '80%',
      data: product
    });

    editDialogRef.afterClosed().subscribe((result: Product) => {
      if (result != null) {
        const newProduct = new Product(result.productname, result.protein, result.carbs, result.fat, result.kcal);
        this.createProduct(newProduct);
      }
    });
  }

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
  editSelectedProduct(item: Ingredient) {
    this.showIngredientAmountDialog(item, this.getProductIndex(item));
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

  insertProduct(product: Ingredient, index: number) {
    this.selectedIngredients.splice(index, 0, product);
  }


  replaceProduct(product: Ingredient, index: number) {
    this.selectedIngredients.splice(index, 1, product);
  }


  // this function does not get index as a parameter, because it is called from HTML
  deleteProduct(product: Ingredient) {
    const index = this.getProductIndex(product);
    this.selectedIngredients.splice(index, 1);
  }

  createProduct(product: Product) {
    this.data.createProduct(product).subscribe(response => {
      console.log(response);
    });
  }

  // endregion
}
