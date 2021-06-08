import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {CategoryService} from "./services/category/category.service";
import {Category} from "./model/category";
import {Product} from "./model/product";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {filter} from "rxjs/operators";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductService} from "./services/product/product.service";
import {CommonService} from "./services/common.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  opened: boolean = true;
  toggle: any;
  categories: Category[]; // will be sent to child component
  products: Product[];
  currentRoute: any;
  product: Product;
  link: any;
  panelOpenState: any;
  productList: ProductListComponent;

  constructor(public authService: AuthService,
              private router: Router,
              private common: CommonService,
              private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService) {

    // authService.prepareUserData();
    // authService.refreshInfo();
    this.prepareCategories();
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRoute = event.url;
        console.log(this.currentRoute)
        if (this.currentRoute === '/home'){
            this.opened = true;
        }
      });
  }


  ngOnInit(): void {
    this.prepareCategories();
    this.common.toggleSideNav.subscribe((toggle: any) => {
      this.opened = toggle;
    })
  }

  // viewProductDetails(product: Product){
  //   this.router.navigate(['products', product.id], {
  //     // queryParams: {
  //     //   Name: product.name
  //     // }
  //   })
  // }


  prepareCategories() {
    this.categoryService.getCategories()
      .subscribe((resData: any) => {
        console.log(resData.data)
        this.categories = resData.data;
        console.log(this.categories)

      })
  }

  styleCategories() {
    this.toggle.style.position = 'relative';
  }


}
