import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Product} from "../../model/product";
import {AuthService} from "../../services/auth/auth.service";
import {ProductService} from "../../services/product/product.service";
import {Category} from "../../model/category";
import {SubCategory} from "../../model/sub-category";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  category: Category;
  item: Product;
  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) {
    route.paramMap.subscribe((params:ParamMap) => {
      if (params.get('id')){
        this.productService.getProductById(params.get('id'))
          .subscribe(res => {
            this.item = res
          })
      } else {
        router.navigate(['/home'])
      }
    })
    if (route.snapshot.data.products) {
      this.products = route.snapshot.data.products;
      // console.log(this.products)
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
  }

}
