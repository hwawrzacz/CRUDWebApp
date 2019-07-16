import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Product} from '../../models/Product';
import {ProductsInRecipes} from "../../models/ProductsInRecipes";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {IngredientAmountDialogComponent} from "../ingredient-amount-dialog/ingredient-amount-dialog.component";
import {Recipe} from "../../models/Recipe";
import {RecipesService} from "../../services/recipes.service";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-product-drag-n-drop',
  templateUrl: './product-drag-n-drop.component.html',
  styleUrls: ['./product-drag-n-drop.component.scss']
})

export class ProductDragNDropComponent implements OnInit {
  allProducts: Product[];
  selectedProducts: Product[] = [];

  allProductsString: string[] = ['jajco', 'banan', 'abus'];
  selectedProductsString: string[] = [];

  constructor(private data: ProductsService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.data.getProducts('').subscribe(
      (data) => { this.allProducts = data;
      });
  }

  showIngredientAmountDialog(ingredient: Product): void {
    const dialogRef = this.dialog.open(IngredientAmountDialogComponent, {
      width: 'auto',
      data: {name: ingredient.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.selectedProducts.push(result);
    });
  }

  drop(event: CdkDragDrop<Product[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.showIngredientAmountDialog(event.previousContainer.data[event.currentIndex]);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
