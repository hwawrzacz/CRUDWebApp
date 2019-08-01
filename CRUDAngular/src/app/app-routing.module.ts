import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPanelComponent} from './components/login-panel/login-panel.component';
import {RecipesListComponent} from './components/recipes/recipes-list/recipes-list.component';
import {ProductsListComponent} from './components/products/products-list/products-list.component';
import {UsersListComponent} from './components/users/users-list/users-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPanelComponent
  },
  {
    path: 'recipes/:adminAccess',
    component: RecipesListComponent
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
