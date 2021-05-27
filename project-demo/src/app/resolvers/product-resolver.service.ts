import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {ProductService} from "../services/product/product.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product[]>{

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> | Promise<Product[]> | Product[] {
    return this.productService.getProducts();
  }

}
