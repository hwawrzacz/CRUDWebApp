import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAmountDialogComponent } from './ingredient-amount-dialog.component';

describe('IngredientAmountDialogComponent', () => {
  let component: IngredientAmountDialogComponent;
  let fixture: ComponentFixture<IngredientAmountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientAmountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientAmountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
