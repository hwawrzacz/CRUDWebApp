import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RecipeDetails} from '../../models/RecipeDetails';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})

export class RecipeDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RecipeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: RecipeDetails) {}

  onClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}


