import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../model/category";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CategoryService} from "../../services/category/category.service";
import {Product} from "../../model/product";
import {SubCategory} from "../../model/sub-category";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  panelOpenState = false;
  categories: Category[];
  products: Product[];
  subcategory: SubCategory[];
  item: SubCategory;
  @Input() inputCategories: Category[]; // input variable

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.categoryService.getSubCategoryById(params.get('id'))
          .subscribe((res:any) => {
            console.log(res.data)
            this.item = res.data
          })
      }
    })
    if (this.route.snapshot.data.categories) {
      this.categories = this.route.snapshot.data.categories.data;

    }
  }


  ngOnInit(): void {
  }

  viewCategoryDetails(category: Category) {
    this.categoryService.viewCategoryDetails(category)
  }

  viewSubCategoryDetails(subCategory: SubCategory) {
    this.categoryService.viewSubCategoryDetails(subCategory)
  }

  // viewCategoryDetails(product: Product){
  //   this.router.navigate(['products', product.id], {
  //     queryParams: {
  //       Name: product.name,
  //     }
  //   })
  // }
}
