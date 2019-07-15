import { Recipe} from 'src/app/models/Recipe';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecipesService } from '../../recipes.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})

export class RecipesListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private data: RecipesService){}

  displayedColumns: string[] = ['name', 'type', 'additiondate', 'details', 'edit', 'delete'];
  //dataSource = this.data.getRecipes();
  //dataSource = new MatTableDataSource<Recipe>(this.recipes);
  dataSource: MatTableDataSource<Recipe>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.data.getRecipes().subscribe( 
      (data) => { this.recipes = data 
      this.dataSource = new MatTableDataSource<Recipe>(this.recipes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }); 
  }
}
