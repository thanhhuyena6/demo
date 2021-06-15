import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Product} from "../../model/product";
import {AuthService} from "../../services/auth/auth.service";
import {ProductService} from "../../services/product/product.service";
import {Category} from "../../model/category";
import {SubCategory} from "../../model/sub-category";
import {CategoryService} from "../../services/category/category.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  category: Category;
  item: Product;
  open: boolean = false;
  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private productService: ProductService,
              private common: CommonService,
              private categoryService: CategoryService,
              private router: Router) {
    route.paramMap.subscribe((params:ParamMap) => {
      if (params.get('id')){
        this.productService.getProductById(params.get('id'))
          .subscribe((res:any) => {
            this.item = res.data
          })
      }
    })
    if (route.snapshot.data.products) {
      this.products = route.snapshot.data.products;
    }
  }



  ngOnInit(): void {
  }


  pushToCart(productId: number, quantity: number){
    if (this.authService.cartItem){
      this.productService.insertToCart(productId, this.authService.cartItem.id,quantity)
        .subscribe(res => {
        })
    }
  }

  viewProductDetails(product: Product){
    this.productService.viewProductDetails(product)
    this.common.toggleSideNav.next(this.open)
  }

}
