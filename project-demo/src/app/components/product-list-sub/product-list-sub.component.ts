import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {Category} from "../../model/category";
import {SubCategory} from "../../model/sub-category";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {ProductService} from "../../services/product/product.service";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-product-list-sub',
  templateUrl: './product-list-sub.component.html',
  styleUrls: ['./product-list-sub.component.scss']
})
export class ProductListSubComponent implements OnInit {
  categories: Category[];
  products: Product[];
  subcategory: SubCategory[];
  item: SubCategory;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.categoryService.getSubCategoryById(params.get('id'))
          .subscribe((res:any) => {
            console.log(res)
            this.item = res.data
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
