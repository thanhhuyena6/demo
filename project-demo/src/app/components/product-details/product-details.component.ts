import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
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
            console.log(resProduct)
            this.product = resProduct;
          })
      }
    })
  }

  ngOnInit(): void {
  }

}
