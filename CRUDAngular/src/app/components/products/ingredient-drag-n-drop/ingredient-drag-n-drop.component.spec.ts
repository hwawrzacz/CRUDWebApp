import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDragNDropComponent } from './ingredient-drag-n-drop.component';

describe('IngredientDragNDropComponent', () => {
  let component: IngredientDragNDropComponent;
  let fixture: ComponentFixture<IngredientDragNDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientDragNDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDragNDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
