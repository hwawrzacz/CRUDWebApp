import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSearchDragNDropComponent } from './advanced-search-drag-n-drop.component';

describe('AdvancedSearchDragNDropComponent', () => {
  let component: AdvancedSearchDragNDropComponent;
  let fixture: ComponentFixture<AdvancedSearchDragNDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedSearchDragNDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSearchDragNDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
