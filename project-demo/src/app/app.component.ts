import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {CategoryService} from "./services/category/category.service";
import {Category} from "./model/category";
import {Product} from "./model/product";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  toggle: any;

  categories: Category[]; // will be sent to child component
  products: Product[];

  constructor(public authService: AuthService,
              private categoryService: CategoryService) {
    authService.prepareUserData();
    // authService.refreshInfo();
    this.prepareCategories();
  }


  ngOnInit(): void {
    this.authService.prepareUserData();
    // this.authService.refreshInfo();
    this.prepareCategories();
  }

  prepareCategories() {
    this.categoryService.getCategories()
      .subscribe(resData => {
        this.categories = resData;
      })
  }

  styleCategories(){
    this.toggle.style.position = 'relative';
  }

}
