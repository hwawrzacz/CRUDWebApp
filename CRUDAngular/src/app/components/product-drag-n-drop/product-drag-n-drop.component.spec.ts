import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDragNDropComponent } from './product-drag-n-drop.component';

describe('ProductDragNDropComponent', () => {
  let component: ProductDragNDropComponent;
  let fixture: ComponentFixture<ProductDragNDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDragNDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDragNDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
