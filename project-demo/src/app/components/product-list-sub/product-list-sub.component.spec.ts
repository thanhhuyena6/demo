import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSubComponent } from './product-list-sub.component';

describe('ProductListSubComponent', () => {
  let component: ProductListSubComponent;
  let fixture: ComponentFixture<ProductListSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
