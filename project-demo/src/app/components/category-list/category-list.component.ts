import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../model/category";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../services/category/category.service";
import {Product} from "../../model/product";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  panelOpenState = false;
    categories: Category[];
    @Input() inputCategories: Category[]; // input variable

    constructor(private route: ActivatedRoute,
                private categoryService: CategoryService,
                private router: Router,) {
        if (this.route.snapshot.data.categories) {
            this.categories = this.route.snapshot.data.categories;
        }
    }



    ngOnInit(): void {
    }

    viewCategoryDetails(category: Category){
        this.router.navigate(['categories', category.id], {
            queryParams: {
                Name: category.name,
            }
        })
    }
  // viewCategoryDetails(product: Product){
  //   this.router.navigate(['categories', product.id], {
  //     queryParams: {
  //       Name: product.name,
  //     }
  //   })
  // }
}
