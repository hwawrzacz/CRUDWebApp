import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPanelComponent} from './components/login-panel/login-panel.component';
import {RecipesListComponent} from './components/recipes/recipes-list/recipes-list.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';
import {UsersListComponent} from './components/users/users-list/users-list.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
