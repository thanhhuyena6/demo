import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {CategoryService} from "./services/category/category.service";
import {Category} from "./model/category";
import {Product} from "./model/product";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav;

  opened: boolean = true;
  toggle: any;
  categories: Category[]; // will be sent to child component
  products: Product[];
  currentRoute: any;
  product: Product;
  link: any;

  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService) {

    authService.prepareUserData();
    // authService.refreshInfo();
    this.prepareCategories();
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd))
      .subscribe(event =>
      {
        this.currentRoute = event.url;
        console.log(this.currentRoute)
       if (this.currentRoute){
         console.log('abc')
           // this.opened = false;
       }
      });
  }


  ngOnInit(): void {
    this.authService.prepareUserData();
    // this.authService.refreshInfo();
    this.prepareCategories();
    // this.link = this.viewProductDetails(this.product);{
    //   this.router.navigate(['products', this.product.id], {
    //     // queryParams: {
    //     //   Name: product.name
    //     // }
    //   })
    // }
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
        // console.log(resData)
        // console.log(resData.data)
        this.categories = resData;
      })
  }

  styleCategories(){
    this.toggle.style.position = 'relative';
  }

}
