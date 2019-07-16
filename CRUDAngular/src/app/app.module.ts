import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatInputModule,
  MatDialogModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RecipesListComponent} from './components/recipes-list/recipes-list.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {RecipeDetailsComponent} from './components/recipe-details/recipe-details.component';
import {ProductDragNDropComponent} from './components/product-drag-n-drop/product-drag-n-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {IngredientAmountDialogComponent} from './components/ingredient-amount-dialog/ingredient-amount-dialog.component';
import {RecipeEditComponent} from './components/recipe-edit/recipe-edit.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesListComponent,
    ProductsListComponent,
    RecipeDetailsComponent,
    ProductDragNDropComponent,
    IngredientAmountDialogComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    DragDropModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    RecipeDetailsComponent,
    RecipeEditComponent,
    IngredientAmountDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
