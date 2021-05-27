import { Component, OnInit } from '@angular/core';
import {Category} from "../../model/category";
import {CategoryService} from "../../services/category/category.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Product} from "../../model/product";
import {ProductService} from "../../services/product/product.service";
import {Images} from "../../model/images";
import {SubCategory} from "../../model/sub-category";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  category: Category;
  products: Product;
  subcategory: SubCategory;
  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
    route.paramMap.subscribe((params:ParamMap) => {
      if (params.get('id')){
        this.categoryService.getCategoryById(params.get('id'))
          .subscribe(res => {
            console.log(res)
            this.products = res
          })
      } else {
        router.navigate(['/home'])
      }
    })
  }

  ngOnInit(): void {

  }

  viewProductDetails(product: Product){
    this.productService.viewProductDetails(product)
  }


}
