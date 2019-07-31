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
  MatSelectModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSidenavModule, // for responsive header
  MatCheckboxModule,
} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {RecipesListComponent} from './components/recipes/recipes-list/recipes-list.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';
import {RecipeDetailsComponent} from './components/recipes/recipe-details/recipe-details.component';
import {IngredientDragNDropComponent} from './components/recipes/ingredient-drag-n-drop/ingredient-drag-n-drop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {IngredientAmountDialogComponent} from './components/recipes/ingredient-amount-dialog/ingredient-amount-dialog.component';
import {RecipeEditComponent} from './components/recipes/recipe-edit/recipe-edit.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { AdvancedSearchComponent } from './components/recipes/advanced-search/advanced-search.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AdvancedSearchDragNDropComponent } from './components/recipes/advanced-search-drag-n-drop/advanced-search-drag-n-drop.component';
import {DatePipe} from "@angular/common";
import { LoginPanelComponent } from './components/login-panel/login-panel.component'; // for responsive header

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesListComponent,
    ProductsListComponent,
    RecipeDetailsComponent,
    IngredientDragNDropComponent,
    IngredientAmountDialogComponent,
    RecipeEditComponent,
    ProductEditComponent,
    AdvancedSearchComponent,
    UsersListComponent,
    UserEditComponent,
    ConfirmationDialogComponent,
    AdvancedSearchDragNDropComponent,
    LoginPanelComponent
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
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatCheckboxModule
  ],
  entryComponents: [
    RecipeDetailsComponent,
    RecipeEditComponent,
    IngredientAmountDialogComponent,
    ProductEditComponent,
    AdvancedSearchComponent,
    UserEditComponent,
    ConfirmationDialogComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule {
}
