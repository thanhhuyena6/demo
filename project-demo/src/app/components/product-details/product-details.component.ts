import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../model/product";
import {Images} from "../../model/images";
import {element} from "protractor";
import {MatSidenav} from "@angular/material/sidenav";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  opened: boolean = false;
  arrayCart: any;
  arrayCartParse: any;
  product: Product;
  images: Images[];
  count: number;
  items: any;
  itemsInCart: any = [];
  yesArray: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
    // route.paramMap.subscribe((params: ParamMap) => {
    //   if (params.get('productId')){
    //     this.productService.getProductById(params.get('productId'))
    //       .subscribe(resProduct => {
    //         this.product = resProduct;
    //       })
    //   }
    // })

    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.productService.getProductDetailById(params.get('id'))
          .subscribe(resProduct => {
            // console.log(resProduct);
            this.product = resProduct;
          })
      }
    })

  }


  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    // nextArrow: '<button class="btn-next" (click)="next()"></button>\n',
    // prevArrow: '<button class="btn-prev" (click)="prev()">prev</button>\n',
    arrows: true,
  };

  ngOnInit(): void {
    this.arrayCart = localStorage.getItem('arrayCart');
    this.arrayCartParse = JSON.parse(this.arrayCart);

    // this.yesArray = [];
    // localStorage.setItem('yesArray', JSON.stringify(this.yesArray));
    // this.yesArray = localStorage.getItem('yesArray');
    // this.yesArray = JSON.parse(this.yesArray);
    // this.yesArray.push('yes');
    // this.yesArray.push('yesArray');
    // localStorage.setItem('yesArray', JSON.stringify(this.yesArray));
    // this.yesArray = localStorage.getItem('yesArray')
    // JSON.parse(this.yesArray);
  }


  pushToCart(item: any) {
    let local_storage = [];
    this.items = {
      product: item,
      quantity: 1,
    }
    if (this.arrayCart.value == null) {
      local_storage = [];
      this.itemsInCart = []
      console.log('local storage null', this.arrayCart);
      this.itemsInCart.push(this.items);
      localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));
      console.log('push first item', this.itemsInCart)
    }
    this.arrayCart = localStorage.getItem('arrayCart');
    this.arrayCartParse = JSON.parse(this.arrayCart);
    local_storage = this.arrayCartParse;
    console.log('local storage has items', local_storage)
    for (let i = 0 ; i < local_storage.length; i++) {
      console.log(local_storage[i].product.id)
      console.log(this.items.product.id)
      console.log(local_storage.length)
      if (this.items.product.id === local_storage[i].product.id) {
        local_storage[i].quantity += 1;
        console.log("Quantity for " + i + " : " + local_storage[i].quantity);
        console.log('same product! index is ', i);
        // this.items = null;
        console.log('items', this.items)
        break;
      }
      // this.itemsInCart.push(this.items);
    }
    // if (this.items) {
    //   console.log('items', this.items)
    //   this.itemsInCart.push(this.items);
    // }
    // local_storage.forEach((item: any) => {
    //   this.itemsInCart.push(item);
    // })
    // localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));

  }

  // let i : number = 1;
  // this.arrayCart.forEach((element: any) => {
  //   console.log(element.id)
  //   if (element.id === item.id){
  //       i += 1;
  //   } else {
  //     this.arrayCart.push(item);
  //   }
  //   console.log('element id :' + element.id)
  //   console.log('item id :' + item.id)
  // })
  // console.log('length array cart : ', this.arrayCart.length)
  // this.count  = i;
  // console.log('count', this.count)

  getItems() {
    return this.arrayCart;
  }
}





