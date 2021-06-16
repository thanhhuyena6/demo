import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../../services/product/product.service';
import {Product} from '../../model/product';
import {Images} from '../../model/images';
import {element} from 'protractor';
import {MatSidenav} from '@angular/material/sidenav';
import {log} from 'util';
import {CommonService} from '../../services/common.service';


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
  quantity: any;
  items: any;
  toggle: any;
  value: number = 0;
  valueCart: number = 0;
  itemsInCart: any = [];
  quantity_order: number;
  totalPrice: number = 0;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private common: CommonService,
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
          .subscribe((resProduct: any) => {
            this.product = resProduct.data[0];
          });
      }
    });

  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    focusOnSelect: true,
  };

  ngOnInit(): void {


  }


  minus() {
    if (this.value >= 0) {
      this.itemsInCart.map((element: any) => {
        if (element.product_id === this.items.product_id) {
          element.quantity_order -= 1;
        }
      });
    }
    this.itemsInCart.forEach((element: any) => {
      this.value = element.quantity_order;
    });
    localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));
  }


  pushTotalCart(item: any) {
    localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));
    this.itemsInCart.map((element: any) => {
      this.valueCart = element.quantity_order;
    });
    this.itemsInCart.forEach((element: any) => {
      this.totalPrice += element.price * element.quantity_order;
    });

    this.common.totalPrice.next(this.totalPrice);
    this.common.cartNumber.next(this.valueCart);

  }

  pushToCart(item: any) {
    this.arrayCart = localStorage.getItem('arrayCart');
    this.itemsInCart = JSON.parse(this.arrayCart);
    this.items = {
      product_id: item.id,
      price: item.price,
      quantity_order: 1,
      product_name: item.name,
      product_img: item.images,
    };
    let isInCart;
    isInCart = this.itemsInCart.some((element: any) =>
      element.product_id === this.items.product_id);
    if (isInCart) {
      this.itemsInCart.map((element: any) => {
        if (element.product_id === this.items.product_id) {
          element.quantity_order += this.items.quantity_order;
        }
        return element;
      });
    } else {
      this.itemsInCart.push(this.items);
    }
    this.itemsInCart.forEach((element: any) => {
      this.value = element.quantity_order;
    });
    localStorage.setItem('arrayCart', JSON.stringify(this.itemsInCart));


  }


  getItems() {
    return this.arrayCart;
  }
}





