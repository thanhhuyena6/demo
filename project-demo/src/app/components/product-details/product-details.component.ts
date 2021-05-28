import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../model/product";
import {Images} from "../../model/images";




@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  images: Images[];
  constructor(private route: ActivatedRoute,
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
      if (params.get('id')){
        this.productService.getProductDetailById(params.get('id'))
          .subscribe(resProduct => {
            console.log(resProduct);
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
  }

}
